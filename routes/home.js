const fs = require('fs');
const express = require('express');
const moment = require('moment');
const path = require('path');
const memCache = require('memory-cache');
const app = express.Router();

const config = require('../utils/config');
const meteParser = require('../utils/meta-parser');
const check = require('../utils/check');

// base uri: /
app.get('/', (req, res, next) => {

    // post dir
    let postsDir = config('postDir', 'posts');
    postsDir = req.app.get('views') + '/' + postsDir;

    let pageDir = 'page';

    let files = fs.readdirSync( postsDir );
    let posts = [];

    files.forEach( filename => {
        let postMeta = memCache.get(filename);
        let useCache = config('cache', true);
        if( ! useCache) {
            memCache.clear();
        }
        if (null === postMeta) {
            let filePath =`${postsDir}/${filename}`;
            let fileStat = fs.lstatSync(filePath);

            if (fileStat.isFile() && filename.indexOf('.md') > -1) {
                let md = fs.readFileSync(filePath, 'utf8');

                if (md.length) {
                    let meta = meteParser(md).meta;
                    let link = meta.link || filename.toLowerCase().replace('.md', '');

                    if ( ! check.isUrl(link) && '/' !== link[0]) {
                        link = '/' + config('postRoute', 'post') + '/' + link;
                    }
                    postMeta = {
                        created_at: fileStat.birthtime,
                        unix: moment(meta.date || fileStat.birthtime).unix(),
                        link: link,
                        filename: filename,
                        title: meta.title || filename.replace('.md', '').replace('-', ' '),
                        date: moment(meta.date || fileStat.birthtime).format(config('dateFormat', 'D MMM YYYY')),
                        author: meta.author || "",
                        tags: meta.tags ? (meta.tags.split(',').map(tag => tag.trim()) || []) : []
                    };
                    // cache data for 1 day
                    memCache.put(filename, postMeta, 1000*60*24);
                }
            }
        }
        if (postMeta) {
            posts.push(postMeta);
        }
    });

    // order by date
    posts.sort((a,b) => a.unix < b.unix)

    return res.render( pageDir + '/index.md', {
        posts: posts,
        config: config()
    });
});

module.exports = app;