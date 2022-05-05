module.exports = {
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif'
      }
    },
    colors: {
      'primary-gray': '#484848',
      muted: '#767676'
    }
  },
  plugins: []
};
