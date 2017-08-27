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
    let sortablePosts = [];

    for(let k in posts) {
        sortablePosts.push(posts[k]);
    }

    sortablePosts.sort((a,b) => {
        if (a.unix > b.unix) return -1;
        if (a.unix < b.unix) return 1;
        return 0;
    });

    return res.render( pageDir + '/index.md', {
        posts: sortablePosts,
        config: config()
    });
});

module.exports = app;
