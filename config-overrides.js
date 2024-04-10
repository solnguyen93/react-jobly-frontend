const { override, fallback } = require('customize-cra');
const cryptoFallback = fallback({ crypto: require.resolve('crypto-browserify') });

module.exports = override(cryptoFallback);
