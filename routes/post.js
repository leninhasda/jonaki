const fs = require('fs');
const express = require('express');
const router = express.Router();
const memCache = require('memory-cache');

const notFoundError = require('../utils/404-not-found');
const config = require('../utils/config');

router.get('/:slug', (req, res, next) => {
    let fileLink = req.params.slug.trim();
    let postMeta = memCache.get(fileLink);
    let postsDir = config('postDir', 'posts');
    let postsDirFull = req.app.get('views') + '/' + postsDir;
    let filePath =`${postsDirFull}/${postMeta.filename}.md`;

    if ( fs.existsSync(filePath) ) {
        return res.render(`${postsDir}/${postMeta.filename}`, {config: config()});
    }
    else {
        return notFoundError(req, res);
    }
});

module.exports = router;