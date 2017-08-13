const YAML = require('js-yaml');

module.exports = MetaParser;

function MetaParser(md) {
    let metaData = [];
    let data = [];
    let line = 0;

    md = ("string" === typeof md) ? md.split('\n') : md;

    if ( ! md[line].match(/^---$/) ) {
        data = md;
    }
    else {
        for (line = 1; line < md.length; line++) {
            if(md[line].match(/^---$/)) {
                break;
            }
            metaData.push(md[line]);
        }
        data = md.slice(line+1);
    }

    return {
        meta: YAML.safeLoad(metaData.join('\n')) || {},
        content: (Array.isArray(data)) ? data.join('\n') : data.trim()
    };
}
