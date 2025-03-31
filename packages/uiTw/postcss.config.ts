/** @type {import('postcss-load-config').Config} */

export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
      },
    },
    autoprefixer: {},
  },
};
