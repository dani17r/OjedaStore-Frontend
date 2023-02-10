module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        // Using modern `rgb`
        white: "#f8f8f8",
        black: "#262626",
        one: "#48408c",
        "one-1": "#6b61b7",
        "one-2": "#5b53ac",
        "one-3": "#524a9c",
        "one-4": "#48408c",
        "one-5": "#3e397a",
        "one-6": "#343069",
        "one-7": "#2c2857",

        two: "#737373",
        "two-1": "#e5e5e5",
        "two-2": "#cccccc",
        "two-3": "#999999",
        "two-4": "#737373",
        "two-5": "#4d4d4d",
        "two-6": "#333333",
        "two-7": "#262626",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
