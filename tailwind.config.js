module.exports = {
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif',
        heiti:
          'Circular, PingFang-SC, "Hiragino Sans GB", 微软雅黑, "Microsoft YaHei", "Heiti SC"'
      },
      colors: {
        gray: {
          muted: '#767676',
          dark: '#484848'
        },
        neutral: {
          150: 'rgb(235 235 235)'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
