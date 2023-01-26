module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dim: "#1E293B",
        darkBody: "#0F172A",
        dimmer: "#334155",
        brand: "#8A2BE2",
        light: "#0070f31c",
        grey: "#bdbdbd",
      },
    },
  },
  plugins: [require("prettier-plugin-tailwindcss")],
};
