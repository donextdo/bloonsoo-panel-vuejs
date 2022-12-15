/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1280px',
      xxl: '1440px'
    },
    fontFamily: {
      lobster: ['Lobster', 'cursive']
    },
    extend: {
      spacing: {
        "medium": "28rem",
        "big": "48rem",
        "half-screen": "50vh",
        "screen-70": "70vh",
        "screen-80": "80vh",
        "thin": "1px"
      }

    },
  },
  plugins: [],
}
