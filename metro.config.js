const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

/**
 * metro 추가
 */
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(getDefaultConfig(__dirname), config)
);
