const Xray = require('x-ray');
const cheerio = require('cheerio');
const app = require('express').Router();


const x = Xray({
    filters: {
        trim: function(value) {
            return typeof value === 'string' ? value.replace(/\n|\r\n?/g, '') : value
        },
        link: function(value) {
            return typeof value === 'string' ? value.replace('https://www.555sports.com/detail/',  process.env.thisUrl+'api/football/') : value
        },
        id : function(value) {
            return typeof value === 'string' ? value.replace('https://www.555sports.com/detail/',  '') : value
        }
    }
});

app.get('/api/football', function(req, res) {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const sportUrl = process.env.sportUrl ;

    let stream=x(sportUrl+'/football', '.match-item', [{
        league: '.top-box .name',
        link: '@href | link',
        id: '@href | id',
        time : '.time@text',
        teams : x('.name-box', {home:'.home', away :'.away'}),
        score : x('.score-box', {home:'.home', away :'.away'})
    }]).stream()
    stream.pipe(res);
});

app.get('/api/football/:id', function(req, res) {
    let id = req.params.id;
    
    let detailUrl =  process.env.sportUrl+ 'detail/'+id ;

    x(detailUrl , {
        body: 'body@html'
    })(function(err, obj) {
        let $ = cheerio.load(obj.body)
        let js = $('script:not([src])')[0].children[0].data;

        let stream = js.match(/m3u8Url:"([\s\S]*?)"/)[0];
        let mu = stream.replace('m3u8Url:', '');
        let m3u = unescape(JSON.parse(mu));

        console.log($('.top-box .name').text());
        if(err) {
            res.send(err);
        }

        let jsonMatch = {
             league : $('.top-box .name').text() ,
             time : $('.bottom-box .time').text(),
             home : $('.name-box .home').text(),
             away : $('.name-box .away').text(),
             scoreH : $('.score-box .home').text(),
             scoreA : $('.score-box .away').text(),
             streamUrl : m3u,
             watch : 'https://egohub.github.io/watch/?video='+ m3u
        };
        res.send(jsonMatch);
    });
});

module.exports = app;
