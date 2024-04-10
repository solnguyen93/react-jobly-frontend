const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        crypto: 'crypto-browserify',
        stream: 'stream-browserify',
    })
);
