module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dim: "#1E293B",
        darkBody: "#0F172A",
        dimmer: "#334155",
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
