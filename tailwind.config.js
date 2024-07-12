/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        cardOverlay: "rgba(256,256,256,0.03)",
        hoverOverlay: "rgba(256,256,256,0.05)",
        menuOverlay: "rgba(256,256,256,0.1)",
      },
    },
  },
  plugins: [],
};
