// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", PingFang-SC, "Hiragino Sans GB", 微软雅黑, "Microsoft YaHei", "Heiti SC", sans-serif'
      },
      colors: {
        muted: '#767676',
        'primary-gray': '#484848',
        neutral: {
          150: 'rgb(235 235 235)'
        }
      }
    }
  },
  plugins: []
};
