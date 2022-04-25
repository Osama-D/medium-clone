module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{jt,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
      },
      keyframes: {
        wave: {
          "0%": { transform: "translateX(10px)" },
          "20%": { transform: "translateX(0px)" },
          "30%": { transform: "translateX(10px)" },
          "40%": { transform: "translateX(0px)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
