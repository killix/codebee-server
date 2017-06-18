module.exports = {
  'testEnvironment': 'node',
  'transform': {
    '^.+\\.ts$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  },
  'testRegex': '(src/__tests__/.*|\\.(test))\\.(ts|js)$',
  'moduleFileExtensions': ['ts', 'js'],
  'roots': [
    '<rootDir>/src'
  ]
};
