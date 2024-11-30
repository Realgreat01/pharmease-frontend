export default defineAppConfig({
  ui: {
    primary: "#0ABF55",
    gray: "neutral",
    fonts: {
      defaults: {
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
    button: {
      default: {
        size: "md",
        loadingIcon: "i-uiw-loading",
      },
      base: "h-10",
      rounded: "rounded-full",
      font: "font-semibold",
    },

    input: {
      default: {
        size: "lg",
        color: "white",
        variant: "outline",
      },
      base: "disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none border-0 border-gray-50",
    },
  },
});
