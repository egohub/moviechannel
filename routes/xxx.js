var Xray = require('x-ray');
const router = require('express').Router();

const x = Xray({
    filters: {
        id: function(value) {
            return typeof value === 'string' ? value.replace('mt-', '') : value;
        },
        xxx: function(value) {
            if (typeof value === 'string') {
                let refine = value.replace("document.write(atob(atob('", '');
                // let spl = refine.split("'1564385425']);");
                // let spX = spl[1];
                let final = refine.replace("')));", '')
                    // let atobx = atob(atob(final));
                return final;
            }
        },
        atobUTF8: function(value) {
            return typeof value === 'string' ? Buffer.from(value, 'base64').toString('utf8') : value;
        },
        relink: function(value) {
            return typeof value === 'string' ? value.replace('https://cat3korean.com', '') : value;
        },
        iframe: function(value) {
            let regex = /.*src="([^"]*)".*/;
            let m;
            if (m = regex.exec(value)) {
                return m[1]
            }
        }
    }
});

let xxxUrl = 'https://cat3korean.com';

router.get('/xxx', function(req, res, next) {
    x(xxxUrl, {
            title: 'title',
            thispage: '.paginado ul li.dd a ',
            totalCount: '.paginado ul li:last-child a@href ',
            // nextpage: '.paginado ul li.dd a | fix2',
            results: x('.peliculas .items .item', [{
                id: '@id | id',
                quality: '.calidad2',
                title: '.tt',
                rate: '.imdbs',
                type: '.typepost',
                year: '.year', //'.fixyear .year',
                link: ' a@href | relink',
                // slug: 'a@href | slug',
                img: '.image img@src',
                overview: '.ttx ',
                details: x('a@href', {
                    title: 'h1',
                    // description: 'a@href',  
                    category: 'i.limpiar',
                    uploadDate: 'meta[itemprop="uploadDate"]@content',
                    embedUrl: 'meta[itemprop="embedUrl"]@content',
                    // director: '#single div[itemprop="director"] meta@content',
                    // actors: x('div[itemprop="actors"]', ['meta[itemprop="name"]@content']),
                    // rel: '.realse script@html | xxx | atobUTF8 | atobUTF8',
                    src: '.realse script@html | xxx | atobUTF8 | atobUTF8 | iframe',
                    // download: x('div.movieplay iframe', [{ url: '@src' }]),
                })
            }])
        })
        .then(function(result) {
            console.log(result);
            res.send(result);
        });
});

router.get('/xxx/page/:id', function(req, res, next) {
    let xpage = xxxUrl + '/page/' + req.params.id;
    x(xpage, '.peliculas .items .item', [{
            id: '@id | id',
            title: '.tt',
            year: '.year',
            img: '.image img@src',
            link: ' a@href | relink',
            details: x('a@href', {
                title: 'h1',
                // description: 'a@href',  
                category: 'i.limpiar',
                uploadDate: 'meta[itemprop="uploadDate"]@content',
                src: '.realse script@html | xxx | atobUTF8 | atobUTF8 | iframe',

            })
        }])
        .then(function(result) {
            console.log(result);
            res.send(result);
        });
});

router.get('/xxx/:id', function(req, res) {
    let shortUrl = xxxUrl + '/?p=' + req.params.id;

    x(shortUrl, {
            title: 'h1',
            category: 'i.limpiar',
            img: 'img[itemprop="image"]@src',
            uploadDate: 'meta[itemprop="uploadDate"]@content',
            src: '.realse script@html | xxx | atobUTF8 | atobUTF8 | iframe',
        })
        .then(function(result) {
            console.log(result);
            res.send(result);
        });
})
module.exports = router;
