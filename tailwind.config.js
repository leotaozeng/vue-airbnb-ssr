module.exports = {
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", PingFang-SC, "Hiragino Sans GB", 微软雅黑, "Microsoft YaHei", "Heiti SC", sans-serif',
        heiti:
          'Circular, PingFang-SC, "Hiragino Sans GB", 微软雅黑, "Microsoft YaHei", "Heiti SC"',
        airmoji: 'Airmoji'
      },
      colors: {
        green: {
          dark: '#2a6e00'
        },
        gray: {
          muted: '#767676',
          dark: '#484848',
          lightest: '#f8f8f8'
        },
        neutral: {
          150: 'rgb(235 235 235)'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
