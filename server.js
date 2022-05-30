/* eslint-disable @typescript-eslint/no-var-requires */

// 该文件为 Node 运行入口
// Server.js will be the backend that renders Vue App as HTML
// Setting up the Dev Server
const fs = require('fs');
const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');
const { createServer: createViteServer } = require('vite');
const isProd = process.env.NODE_ENV === 'production';

async function createServer() {
  const resolve = (p) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : '';

  const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {};

  const app = express();
  const port = 9000;

  let viteServer;
  if (!isProd) {
    // Create Vite server in middleware mode. This disables Vite's own HTML
    // serving logic and let the parent server take control.
    //
    // In middleware mode, if you want to use Vite's own HTML serving logic
    // use `'html'` as the `middlewareMode` (ref https://vitejs.dev/config/#server-middlewaremode)
    viteServer = await createViteServer({
      root: process.cwd(),
      logLevel: 'error',
      server: {
        middlewareMode: 'ssr'
      }
    });

    // use vite's connect instance as middleware
    app.use(viteServer.middlewares);
  } else {
    app.use(require('compression')());
    app.use(serveStatic(resolve('dist/client')));
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        // 1. Read index.html
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and also applies HTML transforms from Vite plugins, e.g. global preambles from @vitejs/plugin-react
        template = await viteServer.transformIndexHtml(url, template);
        // 3. Load the server entry. vite.ssrLoadModule automatically transforms your ESM source code to be usable in Node.js!
        // There is no bundling required, and provides efficient invalidation similar to HMR.
        render = (await viteServer.ssrLoadModule('/src/entry-server.ts'))
          .render;
      } else {
        template = indexProd;
        render = require('./dist/server/entry-server.js').render;
      }

      // 4. render the app HTML. This assumes entry-server.js's exported `render` function calls appropriate framework SSR APIs, ReactDOMServer.renderToString()
      const [renderedHTML, preloadLinks, state] = await render(url, manifest);

      // 5. Inject the app-rendered HTML into the template.
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, renderedHTML)
        .replace('<!--pinia-state-->', state);

      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (e instanceof Error) {
        // If an error is caught, let Vite fix the stracktrace so it maps back to your actual source code.
        viteServer && viteServer.ssrFixStacktrace(e);
        console.log(e.stack);
        res.status(500).end(e.stack);
      }
    }
  });

  app.listen(port, () => {
    console.log(
      `⚡️[server]: Server is running on ${
        isProd ? 'production' : 'development'
      } at http://localhost:${port}`
    );
  });
}

createServer();
