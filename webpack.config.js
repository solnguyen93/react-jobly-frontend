// webpack.config.mjs

const buffer = require.resolve('buffer/');
const crypto = require.resolve('crypto-browserify');
const stream = require.resolve('stream-browserify');
const util = require.resolve('util/');

const config = {
    resolve: {
        fallback: {
            buffer,
            crypto,
            stream,
            util,
        },
    },
};

export default config;
