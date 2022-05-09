const path = require('path');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
if (buildPath) {
    fs.removeSync(buildPath);
}