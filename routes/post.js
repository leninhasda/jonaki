const fs = require('fs');
const express = require('express');
const router = express.Router();

const notFoundError = require('../utils/404-not-found');

router.get('/:slug', (req, res, next) => {
    let slug = req.params.slug.trim();

    let filePath = req.app.get('views') + '/' + slug + '.md';

    if ( fs.existsSync(filePath) ) {
        // return res.sendfile(slug);
        return res.render(slug);
    }
    else {
        return notFoundError(req, res);
    }
});

module.exports = router;