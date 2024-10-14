/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./app/**/*.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ffb703',
        customYellow: '#ffb703',
      }
    },
  },
  plugins: [],
}

