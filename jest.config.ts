// export default {
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//   },
// };

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",

  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
