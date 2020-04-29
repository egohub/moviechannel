const x = require('./x');
const router = require('express').Router();

const baseUrl = 'https://channelmyanmar.org/movies/',
    base = 'https://channelmyanmar.org/',
    pageUrl = 'https://channelmyanmar.org/movies/page/';

router.get('/category', function(req, res) {
    x('https://channelmyanmar.org', '#moviehome .cat-item', [{
            title: 'a',
            id: 'a@href | category',
            url: 'a@href | change',
            count: 'span |  number',
        }])
        .then(function(result) {

            res.send(result);
        });
});

router.get('/category/:id', function(req, res) {
    x(base + 'category/' + req.params.id, {
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

router.get('/category/:cat/page/:id', function(req, res) {
    let url = base + 'category/' + req.params.cat + '/page/' + req.params.id;

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

module.exports = router;