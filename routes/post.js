const fs = require('fs');
const express = require('express');
const router = express.Router();

const notFoundError = require('../utils/404-not-found');
const config = require('../utils/config');
const loadPosts = require('../utils/load-posts');

router.get('/:slug', (req, res, next) => {
    let posts = loadPosts.obj(req.app);
    let fileLink = req.params.slug.trim();
    let postMeta = posts[fileLink];
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