module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
      define: {
        "process.env": {}
      },
    },
  },
}
