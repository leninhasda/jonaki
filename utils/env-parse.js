const fs = require('fs');
const path = require('path')

let _params = {};
let _envPath = path.resolve(__dirname + '/..', '.env');
let userEnvPath = path.resolve(__dirname + '/../resources', '.env');

if (fs.existsSync(userEnvPath)) {
    _envPath = userEnvPath;
}

try {
    env = fs.readFileSync(_envPath, 'utf8');
    env.split(/\s*\n/).forEach( pair => {
        pair = pair.trim();
        if (pair != '' && (index = pair.indexOf('=')) > -1) {
            key = pair.substr(0, index).trim();
            value = pair.substr(index + 1).trim();
            if (key.length && value.length) {
                _params[key] = value;
            }
        }
    });
}
catch(error) {
    throw new Error("No .env file");
}


module.exports = function (key, defaultValue) {
    if (arguments.length === 0) {
        return _params;
    }
    return _params[key] || defaultValue;
}
