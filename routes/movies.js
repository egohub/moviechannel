const x = require('./x');
const router = require('express').Router();

const baseUrl = 'https://channelmyanmar.org/movies/',
    base = 'https://channelmyanmar.org/',
    pageUrl = 'https://channelmyanmar.org/movies/page/';


// router.get('/', function(req, res) {
//     res.send('Hello  Movies');
// });

router.get('/post', (req, res, next) => {
    let url = baseUrl || baseUrl + req.query.id;
    res.send(url);
});

router.get('/movies', function(req, res, next) {
    x(process.env.base  + process.env.s, {
            title: 'title',
            thispage: '.paginado ul li.dd a | number',
            totalCount: '.paginado ul li:last-child a@href | number',
            nextpage: '.paginado ul li.dd a | fix2',
            results: x('.peliculas .items .item', [{
                id: '@id | number',
                quality: '.calidad2',
                title: '.image img@alt | regex',
                rate: '.imdbs',
                type: '.typepost',
                year: '.image img@alt | number', //'.fixyear .year',
                link: ' a@href',
                slug: 'a@href | slug',
                img: '.image img@src',
                overview: '.ttx | trim'
            }])
        })
        .then(function(result) {
            console.log(result);
            res.send(result);
        });
});

router.get('/movies/page/:id', function(req, res) {

    let url = process.env.movies + req.params.id + process.env.s;
    x(url, {
            title: 'title',
            thispage: '.paginado ul li.dd a | number',
            totalCount: '.paginado ul li:last-child a@href | number',
            nextpage: '.paginado ul li.dd a | fix2',
            results: x('.peliculas .items .item', [{
                id: '@id | number',
                quality: '.calidad2',
                title: '.image img@alt | regex',
                rate: '.imdbs',
                type: '.typepost',
                year: '.image img@alt | number', //'.fixyear .year',
                link: ' a@href | replace',
                slug: 'a@href | slug',
                img: '.image img@src',
                overview: '.ttx | trim'
            }])
        })
        .then(function(result) {
            res.send(result);
        });
});

router.get('/movie/:id', function(req, res) {
    console.log(base + req.params.id);
    x(base + req.params.id, {
            title: '.fix img@alt | regex',
            img: '.fix img@src',
            description: '#cap1',
            category: 'i.limpiar',
            uploadDate: 'meta[itemprop="uploadDate"]@content',
            embedUrl: 'meta[itemprop="embedUrl"]@content',
            director: '#single div[itemprop="director"] meta@content',
            actors: x('div[itemprop="actors"]', ['meta[itemprop="name"]@content']),
            gallary: x('div.galeria_img', ['img@src']),
            download: x('li.elemento', [{ size: '.c', site: '.b | host', quality: '.e', url: 'a@href' }]),
            mega: x('li.elemento', [{ url: 'a@href | mega' }]),
            yadi: x('li.elemento', [{ url: 'a@href | yadi', id: 'a@href | yadi  |yadiId' }]),
            upstream: x('li.elemento', [{ url: 'a@href | upstream' }]),
            relate: x('#slider1 div div', [{ link: 'a@href', title: 'img@alt', img: 'img@src' }])
        })
        .then(function(result) {

            res.send(result);
        });
});

module.exports = router;
