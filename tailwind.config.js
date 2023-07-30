/** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ["./client/**/*.html"],
    theme: {
      extend: {
        borderWidth: {
          '1px': '1px', 
        },
        fontFamily: {
          '--lion-family': ['Pretendard', 'sans-serif'],
        },
        colors: {
          white: "#ffffff",
          black: "#333",
          grey0: "#A6A6A6",
          grey1: "#898989",
          grey2: "#C4C4C4",
          grey3: "#E1E1E1",
          grey4: "#D9D9D9",
          violet: "#5F0080",
          error: "#F03F40",
          orange: "#FA622F"
      },
      content: {
        'arrow' : 'url("/assets/icons/arrow_violet.svg")'
      },
    },
    plugins: [],
  },
};