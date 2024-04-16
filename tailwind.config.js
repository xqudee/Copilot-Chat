/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      colors: {
        blue: {
          option: '#EAEDFF',
          message: '#F1F2FB',
          input: '#F7F8FB',
          menu_item: '#F1F5FF'
        },
        orange: {
          light: '#FBF2E9'
        },
        text: {
          gray: '#787878'
        },
        menu: {
          active: '#E1E1E1'
        }
      },
      boxShadow: {
        'custom': '0px 8px 20px 0px rgba(19, 25, 35, 0.15)',
      },
    },
  },
  plugins: [],
}

