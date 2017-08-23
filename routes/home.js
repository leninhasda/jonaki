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
    let postsDir = req.app.get('views') + '/posts';
    let pageDir = 'page';

    let files = fs.readdirSync( postsDir );
    let posts = [];

    files.forEach( filename => {
        let postMeta = memCache.get(filename);
        let useCache = config('cache', true);

        // if( ! useCache) {
        //     memCache.clear();
        // }

        if (null === postMeta) {
            let filePath =`${postsDir}/${filename}`;
            let fileStat = fs.lstatSync(filePath);

            if (fileStat.isFile() && filename.indexOf('.md') > -1) {
                let md = fs.readFileSync(filePath, 'utf8');

                if (md.length) {
                    let meta = meteParser(md).meta;
                    let nameLink = makeLinkFromFilename(filename);
                    let link = '/' + config('postRoute', 'post') + '/' + nameLink;

                    postMeta = {
                        created_at: fileStat.birthtime,
                        unix: moment(meta.date || fileStat.birthtime).unix(),
                        link: link,
                        filename: filename.replace('.md', ''),
                        fullFilename: filename,
                        title: meta.title || makeTitleFromFilename(filename),
                        date: moment(meta.date || fileStat.birthtime).format(config('dateFormat', 'D MMM YYYY')),
                        author: meta.author || "",
                        tags: meta.tags ? (meta.tags.split(',').map(tag => tag.trim()) || []) : []
                    };
                    // cache data for 1 day
                    let expTime = 1000 * 60 * 24;
                    memCache.put(nameLink, postMeta, expTime);
                }
            }
        }
        if (postMeta) {
            posts.push(postMeta);
        }
    });

    // order by date
    posts.sort((a,b) => a.unix < b.unix);
    // req.app.set('cacheData', memCache.exportJson());
    return res.render( pageDir + '/index.md', {
        posts: posts,
        config: config()
    });
});

function ucWords(line) {
    return line.toLowerCase().replace(/\b[a-z]/g, firstChar => firstChar.toUpperCase());
}

function makeTitleFromFilename(filename) {
    let nameOnly = makeLinkFromFilename(filename);
    return ucWords(nameOnly.replace('-', ' '));
}

function makeLinkFromFilename(filename) {
    try {
        let nameOnly = filename.split('--')[1];
        return nameOnly.toLowerCase().replace('.md', '');
    } catch (error) {
        throw new Error("Incorrect file name");
    }
}

module.exports = app;