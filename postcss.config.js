module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.ENV === "production" ? { cssnano: {} } : {}),
  },
};
