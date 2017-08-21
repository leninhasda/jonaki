const fs = require('fs');
const path = require('path');
const YAML = require('js-yaml');

let _params = {};
let _userConfigPath = path.resolve(__dirname + '/../resources', 'config.yml');

try {
    let configData = fs.readFileSync(_userConfigPath, 'utf8');
    _params = YAML.safeLoad(configData) || {};
}
catch(error) {
    console.log(error)
    throw new Error("No config file");
}

// expose as a function
module.exports = function (key, defaultValue) {
    if (arguments.length === 0) {
        return _params;
    }
    return _params[key] || defaultValue;
}
