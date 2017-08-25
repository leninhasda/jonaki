const express = require('express');
const app = express.Router();

const config = require('../utils/config');
const meteParser = require('../utils/meta-parser');
const check = require('../utils/check');
const loadPosts = require('../utils/load-posts');

// base uri: /
app.get('/', (req, res, next) => {
    let pageDir = 'page';
    let posts = loadPosts.obj(req.app);
    // order by date
    // posts.sort((a,b) => a.unix < b.unix);
    console.log(posts)
    console.log(typeof posts)

    return res.render( pageDir + '/index.md', {
        posts: posts,
        config: config()
    });
});

module.exports = app;
