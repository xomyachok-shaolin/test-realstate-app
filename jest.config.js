module.exports = {
    preset: 'ts-jest', // Используйте 'ts-jest', если предпочитаете его; иначе пропустите эту строку
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
      // Моки для CSS модулей
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      // Моки для статических файлов (например, изображений)
      '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    transform: {
      // Используйте 'babel-jest' для трансформации файлов
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/'], // Игнорируем трансформацию node_modules
  };
  