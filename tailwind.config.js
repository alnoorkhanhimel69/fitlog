/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.js", "./components/**/*.js"],
  theme: {
    extend: {
      colors: { ink: "#0b0d10", panel: "#12151a", line: "#232830", mute: "#8b93a0", lime: "#ccff00" },
      fontFamily: { display: ["Oswald", "Impact", "sans-serif"], sans: ["Inter", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
