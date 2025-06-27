/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
theme: {
  extend: {
    colors: {
      primary: "#F2F8FF", 
    },
    fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
  },
},
plugins: [
  require('tailwind-scrollbar-hide')
],


}

