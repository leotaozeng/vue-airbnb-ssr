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
      fontSize: {
        none: '0'
      },
      colors: {
        blue: {
          dark: '#223b92'
        },
        cyan: {
          dark: '#008489'
        },
        green: {
          dark: '#2a6e00'
        },
        gray: {
          muted: '#767676',
          light: 'f2f2f2',
          lightest: '#f8f8f8',
          dark: '#717171',
          darkest: '#484848'
        },
        neutral: {
          150: 'rgb(235 235 235)'
        }
      },
      zIndex: {
        100: '100'
      },
      spacing: {
        5.5: '22px'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
};
