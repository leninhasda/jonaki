const fs = require('fs');

module.exports = NotFoundError;

function NotFoundError(req, res) {
    let errorTemplate = req.app.get('views') + '/templates/error.pug';
    if (fs.existsSync(errorTemplate)) {
        return res.status(404).render(errorTemplate);
    }
    else {
        return res.status(404).send('4oh4 - not found');
    }
}