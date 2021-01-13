module.exports = {
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.spec.{ts,tsx,js}'],
  transform: {
    '^.+\\.(tsx?)$': 'ts-jest',
  },
};
