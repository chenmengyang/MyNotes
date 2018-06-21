let request = require('superagent');
require('superagent-charset')(request);
let cheerio = require('cheerio');
let async = require('async');
let R = require('ramda');
let admin = require("firebase-admin");
let serviceAccount = require("./secret.json");
// firebase init
let app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mynotes-addc6.firebaseio.com"
});
let db = admin.firestore();
// urls
let cl_url_base = 'https://t66y.com';
let cl_url_dyg = 'https://t66y.com/thread0806.php?fid=16';
const collectionName = `cl-dgy`;

// get html text from url, use superagent-charset for chinese issue
const getPage = (url) => new Promise((resolve) => {
    request.get(url).charset('gbk')
    .end((err, sres) => {
        var html = sres.text;
        var $ = cheerio.load(html, {decodeEntities: false});
        resolve($);
    })
});

// scrape detail page images, and inject firebase as document
const handle_detailpage = async (url, index, callback) => {
    let photoUrls = [];
    let comments = [];
    let $ = await getPage(url);
    let id = url.split('/').slice(-1)[0].split('.')[0];
    let title = $('h4').first().text();
    let postDate = $('div.tipad').first().text().split('|')[0].replace(/TOP.*Posted:/,'');
    // get images
    $('div.tpc_content').find('input[type="image"]')
    .filter((i, el) => el.attribs.type === 'image')
    .each((i, el) => {
        photoUrls.push(el.attribs["data-src"]);
    });
    photoUrls = R.slice(1, Infinity, R.uniq(photoUrls));
    // get comments
    $('div.tpc_content.do_not_catch')
    .filter((i, el) => el.children[0].type=='text')
    .each((i, el) => {
        if (el.children[0] && el.children[0].data) {
            comments.push(el.children[0].data);
        }
    });
    const val = {
        id,
        title,
        photoUrls,
        comments,
        postDate,
        status: {
            light: $('.tpc_content.do_not_catch>div.tips').length ? true : false
        }
    };
    await db.collection(collectionName).doc(id).set(val);
    console.log(`finish task${index}`);
    callback(null);
}

// control the parallel parameter
const scrape = (urlList, limit) => new Promise((resolve, reject) => async.parallelLimit(urlList.map((u, i) => (cb)=> handle_detailpage(u, i, cb)), limit, (err, result) => {
    if (err) {
        reject(`err is ${JSON.stringify(err)}`);
    }
    resolve(result);
}));

// main program
(async () => {
    let subpages = [];
    try {
        $ = await getPage(cl_url_dyg);
        $('.tr2').last().nextAll('.tr3.t_one.tac').find('a')
        .filter((i, el) => el.attribs.target === '_blank' && el.attribs.href.includes('htm_data/'))
        .each(async (i, el) => {
            const subpage_url = el.attribs.href;
            // be careful with duplicated records
            if (subpages.indexOf(subpage_url)===-1) {
                subpages.push(subpage_url);
            }
        })
        subpages = subpages.map(p => `${cl_url_base}/${p}`);
        console.log(`got ${subpages.length} sub pages, handle it 10 by 10`);
        await scrape(subpages, 5);
        app.delete();
    } catch(err) {
        console.log(`err is ${err}`);
    }
})();