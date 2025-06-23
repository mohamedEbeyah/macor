// babel.config.js
console.log('✅ babel.config.js loaded'); // You can leave this for debugging

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
