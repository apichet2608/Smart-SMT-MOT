/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1488px",
      "2xl": "1872px", //pc dev
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        xl: "2rem",
        "2xl": "2rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
