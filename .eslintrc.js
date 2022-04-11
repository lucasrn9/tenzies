module.exports = {
    extends: [
      "airbnb",
      "airbnb-typescript",
      "prettier",
      "react-app",
      "react-app/jest"
    ],
  
    plugins: [
      "prettier"
    ],
  
    rules: {
      "prettier/prettier": "error",
      "react/function-component-definition": [
        2,
        {
          namedComponents: "arrow-function",
        },
      ],
      "no-return-assign": ["error","except-parens"]
    },
  
    parserOptions: {
      project: "./tsconfig.json"
    }
  
  }