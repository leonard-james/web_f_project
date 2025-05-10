const plugin = require("@tailwindcss/container-queries");

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Include all files in the `app` folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include all files in the `components` folder
  ],
  theme: {
    extend: {
      // Add customizations here if needed
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [plugin], // Add the container queries plugin
};