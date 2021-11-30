module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["google"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "comma-dangle": "off",
    "quotes": "off",
    "semi": "off",
    "object-curly-spacing": "off",
    "indent": "off",
    "require-jsdoc": "off",
  },
};
