const cheerio = require('cheerio');
const app = require('express').Router();
const proxycrawl = require("proxycrawl");
const { CrawlingAPI, LeadsAPI } = require('proxycrawl');
const api = new CrawlingAPI({ token: process.env.token });
const apiJs = new CrawlingAPI({ token: process.env.jstoken });
const watchUrl = 'https://egohub.github.io/watch/?video=';

app.get('/api/sports/detail/:id', function(req, res) {
    let id = req.params.id;
    console.log(process.env.sportUrl+'detail/'+id);

    apiJs.get(process.env.sportUrl+'detail/'+id, { pageWait: 2000 }).then(response => {
        if (response.statusCode === 200) {
            let data = response.body;
            let $  = cheerio.load(response.body);
            let m3u = data.match(/m3u8Url:"([\s\S]*?)"/)[1];
            let m3u8 = m3u.replace('\\u002F\\u002F', '//')
                          .replace('\\u002Flive\\u002F', '/live/');
            
            let league = $('.top-box .name').text();
            let home = $('.name-box .home').text();
            let away = $('.name-box .away').text();
            console.log(league);
            res.json({league: league, m3u8: m3u8, watch : watchUrl+m3u8 , heroku: 'video.html?video='+m3u8,home: home, away: away});
        }
    }).catch(error => res.send(error));
});

app.get('/api/sports', (req, res)=> {
    api.get(process.env.sportUrl).then(response => {

        const all = {soccer:[], games:[], basketball:[], tennis:[]};
        let $ = cheerio.load(response.body);
        
        $('.match-item').each((index, i) => {
            let foot = $(i).find('.football-match').addClass('football');
        let game = $(i).find('.game-match').addClass('game');
        let basket = $(i).find('.basketball-match').addClass('basketball');
        let ten = $(i).find('.tennis-match').addClass('tennis');

        let foots = $(i).children().hasClass('football');
        let egame =  $(i).children().hasClass('game');
        let baskets =  $(i).children().hasClass('basketball');
        let tenni =  $(i).children().hasClass('tennis');

        let href = $(i).attr('href');
        let src = href.replace("/detail/", "");
        if(foots){
            all.soccer.push({
                id:src,
                goto : process.env.thisUrl+'api/sports'+$(i).attr('href'),
                league : $(i).find('.football .top-box .name').text(),
                time : $(i).find('.football .bottom-box .text').text().trim(),
                home : $(i).find('.football .name-box .home').text(),
                away : $(i).find('.football .name-box .away').text()
                });
            }

            if(egame){
                all.games.push({
                id:src,
                goto : process.env.thisUrl+'api/sports'+$(i).attr('href'),
                esport : $(i).find('.game .top-box .name').text(),
                home : $(i).find('.game .name-box .home').text(),
                away : $(i).find('.game .name-box .away').text()
                });
            }
            if(baskets){
                all.basketball.push({
                id:src,
                goto : process.env.thisUrl+'api/sports'+$(i).attr('href'),
                league : $(i).find('.basketball .top-box .name').text(),
                home : $(i).find('.basketball .name-box .home').text(),
                away : $(i).find('.basketball .name-box .away').text()
                });
            }
            if(tenni){
                all.tennis.push({
                id:src,
                goto : process.env.thisUrl+'api/sports'+$(i).attr('href'),
                title : $(i).find('.tennis .top-box .name').text(),
                home : $(i).find('.tennis .name-box .home').text(),
                away : $(i).find('.tennis .name-box .away').text()
                });
            }
            
        });
        res.send(all);
    }).catch(error => console.error);
});
module.exports = app;
