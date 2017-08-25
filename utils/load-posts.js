const fs = require('fs');
const moment = require('moment');
const memCache = require('memory-cache');
const config = require('./config');
const metaParser = require('./meta-parser');

module.exports.full = loadPostsFull;
module.exports.obj = loadPostsObj;

function loadPostsFull(app) {
    return loadPosts(app);
}

function loadPostsObj(app) {
    let all = loadPosts(app);
    let posts = {};
    Object.keys(all).forEach(link => {
        posts[link] = all[link].value;
    });
    return posts;
}

function loadPosts(app) {
    let postsDir = app.get('views') + '/posts';
    let files = fs.readdirSync( postsDir );

    if (memCache.size() !== files.length) {

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
                        let meta = metaParser(md).meta;
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
        });
    }

    return JSON.parse(memCache.exportJson());
}

function ucWords(line) {
    return line.toLowerCase().replace(/\b[a-z]/g, firstChar => firstChar.toUpperCase());
}

function makeTitleFromFilename(filename) {
    let nameOnly = makeLinkFromFilename(filename);
    return ucWords(nameOnly.replace('-', ' '));
}

function makeLinkFromFilename(filename) {
    try {
        let nameOnly = filename.split('_')[1];
        return nameOnly.toLowerCase().replace('.md', '');
    } catch (error) {
        throw new Error("Incorrect file name");
    }
}
