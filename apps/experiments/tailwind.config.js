/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@tremor/**/*.{js,ts,tsx,jsx}",
  ],
  preset: [require("@local/configs/tailwind.config")],
}
