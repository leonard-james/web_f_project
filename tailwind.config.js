const plugin = require("@tailwindcss/container-queries");

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Include all files in the `app` folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include all files in the `components` folder
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"), // Add this plugin
  ],
};