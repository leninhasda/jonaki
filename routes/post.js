const fs = require('fs');
const express = require('express');
const router = express.Router();

const notFoundError = require('../utils/404-not-found');
const config = require('../utils/config');

router.get('/:slug', (req, res, next) => {
    let filename = req.params.slug.trim();

    let postsDir = config('postDir', 'posts');
    let postsDirFull = req.app.get('views') + '/' + postsDir;

    let filePath =`${postsDirFull}/${filename}.md`;

    if ( fs.existsSync(filePath) ) {
        return res.render(`${postsDir}/${filename}`, {config: config()});
    }
    else {
        return notFoundError(req, res);
    }
});

module.exports = router;