const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Add .cjs extension support
defaultConfig.resolver.sourceExts.push('cjs');

// Disable "package exports"
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig;
