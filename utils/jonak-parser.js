const marked = require('marked');
const metaParser = require('./meta-parser');

module.exports = JonakParser;

function JonakParser(md) {

    let parsed = metaParser(md);
    parsed.content = marked(parsed.content);

    return parsed;
}
