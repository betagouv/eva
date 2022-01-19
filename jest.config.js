module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: [
    '<rootDir>/.jest/register-context.js'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/.jest/before-after.js'
  ],
  modulePaths: [
    '/shared/vendor/modules'
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
    'vue',
    'test.js'
  ],
  moduleDirectories: [
    'node_modules',
    'bower_components',
    'shared',
    'src/situations'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '\\.(mp3|png|jpg|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileTransformer.js'
  },
  moduleNameMapper: {
    i18next: '<rootDir>/__mocks__/i18nextMock.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^(commun|controle|inventaire|maintenance|objets_trouves|prevention|tri)/(.*)$': '<rootDir>/src/situations/$1/$2'
  }
};
