module.exports = {
  plugins: [
    // require("postcss-import"),
    // require("postcss-nested")({ bubble: ["screen"] }),
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.ENV === "production" ? [require("cssnano")] : {}),
  ],
};
