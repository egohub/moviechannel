"use strict"
const router = require('express').Router();
const request = require('request'),
      apiUrl = process.env.apiUrl, 
      movieUrl = process.env.movieUrl,
      serieUrl = process.env.serieUrl,
      seasonUrl = process.env.seasonUrl,
      searchUrl = process.env.searchUrl,
      key = process.env.key;

router.get('/api', (req, res) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    res.json({
        'title': 'this is rest-api for movie . ha ha',
        'first': fullUrl + 'first',
        'movie': fullUrl + 'movie',
        'movie/page': [{
            'guide': 'Get movie one page per 30. example page 2  /movie/2',
            'url': fullUrl + 'movie/0'
        }],
        'series': [{
            'guide': 'Get by page id . example serie/:id',
            'url': fullUrl + 'serie/0'
        }],
        'search': [{
            'guide': 'Get by search name . example spiderman',
            'url': fullUrl + 'search?s=Spider'
        }]
    });
});

router.get('/api/first', (req, res) => {
    let url = apiUrl + 'first' + key;
    request(url, (err, resp, body) => {
        res.json(JSON.parse(body))
    });
});

router.get('/api/movie', (req, res) => {
    let url = movieUrl + '0' + key;
    let customRequest = request.defaults({ headers: { 'user-agent': 'okhttp/3.12.5' } });
    customRequest(url, (err, resp, body) => {
        var result = JSON.parse(body);
        res.json({ userAgent: req.headers['user-agent'], result: result });
    });
});

router.get('/api/movie/:page', (req, res, next) => {
    let url = movieUrl + req.params.page + key;
    request(url, (err, resp, body) => {
        res.json(JSON.parse(body))
    });
});

router.get('/api/serie', (req, res) => {
    let url = serieUrl + '0' + key;
    request(url, (err, resp, body) => {
        res.json(JSON.parse(body))
    });
});

router.get('/api/serie/:page', (req, res) => {
    let url = serieUrl + req.params.page + key;
    request(url, (err, resp, body) => {
        res.json(JSON.parse(body))
    });
});

router.get('/api/season/:id', (req, res) => {
    let url = seasonUrl + req.params.id + key;
    request(url, (err, resp, body) => {
        res.json(JSON.parse(body))
    });
});

router.get('/api/search', (req, res) => {
    let url = searchUrl + req.query.s + key;
    request(url, (err, resp, body) => {
        res.json(JSON.parse(body));
    });
});
module.exports = router;
