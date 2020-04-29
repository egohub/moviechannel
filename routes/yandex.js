const router = require('express').Router();
const sync = require('sync-request');
const cheerio = require('cheerio');
const request = require('request');

router.get('/yadi', function(req, res) {
    var url = req.query.url;
    request(url, function(error, response, body) {
        let $ = cheerio.load(body);
        let results = {};
        var init = $("script[type='application/json']").html(),
            ini = JSON.parse(init), //JSON.parse(JSON.stringify(init));
            id = ini.rootResourceId,
            data = ini.resources[id];
        results.title = data.name;
        results.info = data.videoStreams.videos;
        // console.log(video);
        res.send(results);
    });
});

router.get('/yadi/:id', function(req, res) {
    let yandiId = req.params.id;
    let url = sync('GET', 'https://yadi.sk/i/' + yandiId).body.toString();
    let $ = cheerio.load(url);
    let video = {},
        init = $("script[type='application/json']").html(),
        ini = JSON.parse(init), //JSON.parse(JSON.stringify(init));
        id = ini.rootResourceId,
        data = ini.resources[id];
    video.title = data.name;
    video.info = data.videoStreams.videos;
    // console.log(video);
    res.send(video);
});

router.get('/mega/:id', (req, res) => {
    let id = req.params.id;
    var resp = sync('GET', 'https://megaup.net/' + id).body.toString();
    let $ = cheerio.load(resp, { xmlMode: true });
    let init = $('.row >  script');
    var link = $(init).find('a').attr('href');
    res.send(link)
})
module.exports = router;