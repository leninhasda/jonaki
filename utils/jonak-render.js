const fs = require('fs');
const JonakParser = require('./jonak-parser');

module.exports = index;

function index (app) {
    return (filePath, options, callback) => {
        fs.readFile(filePath, 'utf8', (error, content) => {
            if (error) {
                return callback(new Error(error));
            }

            const rendered = _render(content, options);

            if ('template' in rendered.meta) {
                return app.render(rendered.meta.template, rendered, callback);
            }

            callback(null, rendered.content);
        })
    }
}

// _render is private
function _render (content, options) {
    const data = {};
    let excludeList = ['settings', '_locals', 'cache'];
    Object.keys(options).forEach(key => {
        if (! excludeList.includes(key)) {
            data[key] = options[key];
        }
    });

    const parsed = JonakParser(content);

    return {
        content: parsed.content,
        meta: parsed.meta,
        data: data
    }
}