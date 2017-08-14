const fs = require('fs');
const express = require('express');
const router = express.Router();

const notFoundError = require('../utils/404-not-found');
const env = require('../utils/env-parse');

router.get('/:slug', (req, res, next) => {
    let filename = req.params.slug.trim();

    let postsDir = env('postDir', 'posts');
    let postsDirFull = req.app.get('views') + '/' + postsDir;

    let filePath =`${postsDirFull}/${filename}.md`;

    if ( fs.existsSync(filePath) ) {
        return res.render(`${postsDir}/${filename}`);
    }
    else {
        return notFoundError(req, res);
    }
});

module.exports = router;