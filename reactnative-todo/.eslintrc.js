module.exports = {
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  root: true,
  rules: {
    'no-unused-vars': [2, { varsIgnorePattern: '_' }],
    'react/prop-types': 0,
  },
};
