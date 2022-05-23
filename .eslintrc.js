module.exports = {
  extends: ["next/core-web-vitals", "prettier", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    quotes: ["error", "double"],
    "@next/next/no-img-element": "off",
    "react-hooks/exhaustive-deps": "error",
  },
};
