const fs = require('fs');
const express = require('express');
const moment = require('moment');
const path = require('path');
const app = express.Router();

const env = require('../utils/env-parse');
const meteParser = require('../utils/meta-parser');
const check = require('../utils/check');

// base uri: /
app.get('/', (req, res, next) => {

    // post dir
    let postsDir = env('postDir', 'posts');
    postsDir = req.app.get('views') + '/' + postsDir;

    let pageDir = 'page';

    let files = fs.readdirSync( postsDir );
    let posts = [];

    files.forEach( filename => {
        // todo set node-cache
        let filePath =`${postsDir}/${filename}`;
        let fileStat = fs.lstatSync(filePath);

        if (fileStat.isFile() && filename.indexOf('.md') > -1) {
            let md = fs.readFileSync(filePath, 'utf8');

            if (md.length) {
                let meta = meteParser(md).meta;
                let link = meta.link || filename.split(' ').join('-').toLowerCase().replace('.md', '');
                if ( ! check.isUrl(link) && '/' !== link[0]) {
                    link = '/post/' + link;
                }
                let postMeta = {
                    created_at: fileStat.birthtime,
                    unix: moment(fileStat.birthtime).unix(),
                    link: link,
                    filename: filename,
                    title: meta.title || filename.replace('.md', '').replace('-', ' '),
                    date: moment(meta.date || fileStat.birthtime).format(env('dateFormat', 'D MMM YYYY')),
                    author: meta.author || "",
                    tags: meta.tags ? (meta.tags.split(',').map(tag => tag.trim()) || []) : []
                };
                posts.push(postMeta);
            }
        }
    });

    posts.sort((a,b) => a.unix > b.unix)

    return res.render( pageDir + '/index.md', {
        posts: posts
    });
});

module.exports = app;