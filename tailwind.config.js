/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        main: "#50C5C8",
        subMain: "#26A69A",
        textSecondColor: "#03363D",
        textColor: "#BBBBBB",
        hoverColor: "#09868b",
        logout: "#AE2E2E",
        gray: "#969696",
        title: "#1F7A57",
        inputsPlaceholder: "#9ca3af",
      },
      boxShadow: {
        'smoothCard': '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.04)',
        'smoothCardHover': '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -5px rgba(0, 0, 0, 0.04)'
      }
    },
  },
  plugins: [],
}
