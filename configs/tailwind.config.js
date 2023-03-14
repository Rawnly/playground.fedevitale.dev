const {
  plugin: radixColors,
  colors,
  createAlias,
} = require("tailwind-radix-colors")

const neutral = createAlias("base", "slate")

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      ...colors,
      neutral,
    },
    extend: {},
  },
  plugins: [
    radixColors({
      colors: { ...colors, neutral },
    }),
  ],
}
