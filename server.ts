// * Setting up the Dev Server
// * Server.js will be the backend that renders Vue App as HTML
import express, { Express, Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';

async function createServer() {
  const app: Express = express();
  const port = 8080;

  // * Create Vite server in middleware mode. This disables Vite's own HTML
  // * serving logic and let the parent server take control.
  //
  // * In middleware mode, if you want to use Vite's own HTML serving logic
  // * use `'html'` as the `middlewareMode` (ref https://vitejs.dev/config/#server-middlewaremode)
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }
  });

  // * use vite's connect instance as middleware
  app.use(vite.middlewares);
  app.use('*', (req: Request, res: Response) => {
    // * serve index.html - we will tackle this next
    const html = `
    <html>
      <head>
        <title>Hello</title>
      </head>
      <body>
        Hello!
      </body>
    </html>
  `;

    res.end(html);
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
}

createServer();
