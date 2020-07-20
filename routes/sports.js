"use strict";

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

exports.soccerOdd = async function() {

    try {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('http://www.mbet369.com/_view/MOdds369.aspx');
        await page.waitFor(2500);

        let content = await page.content();
        const mbet = { leagueName: '', match: [] };

        const $ = cheerio.load(content);
        let start = $('.GridBg1 .GridBg2 ').not('tbody[soclid="0"]');
        let mbet369 = [];
        let play = { league: {}, live: {} };

        let name, team, oddBody, oddOU, gpOdd, time, home, acolor, hcolor;
        let todayMatches = { leagueName: {}, matches: [] };
        let liveMatches = { leagueName: {}, live: {}, matches: [] };

        const runLive = $('#tableRunN .GridBg2 ').not('tbody[soclid="0"]'); //$table.find("tr").not(":has('th')");
        const runToday = $('#tableTodayN .GridBg2 ').not('tbody[soclid="0"]');

        $(start).each(function(i, element) {
            let a = $(this).find('.GridItem')

            play.league = a.find('.L_Name ').text().trim();
            play.live = $(this).find('.GridItem').children().hasClass('eventRun2');
            play.team = [];
            // play.live = live;
            let b = $(this).find('.MMGridItem');
            $(this).find('.MMGridItem').each(function() {
                let obj = {
                    home: $(this).find('td').eq(1).text().split('-vs-')[0].trim(),
                    away: $(this).find('td').eq(1).text().split('-vs-')[1].trim(),
                    body: {
                        hdp: $(this).find('td').eq(2).text().trim(),
                        odd: Number($(this).find('td').eq(3).text()) || "",
                        status: oddStatus($(this).find('td').eq(2).text().trim())
                    },
                    ftou: {
                        ou: $(this).find('td').eq(5).text().trim(),
                        odd: Number($(this).find('td').eq(6).text()) || ""
                    }
                };
                play.team.push(obj);
                return play;

                //console.log(play);
            });
            mbet369.push(play);
            return mbet369;

        });

        
        console.log(JSON.stringify(play, null, 4));


        await browser.close();

    } catch (err) {
        console.log(err.message);
    }
}


function hColor(str) {
    var give = "Give";
    var color = "red";
    if (str === give) {
        return color;
    } else {
        color = "black";
        return color;
    }
};

function aColor(str) {
    var give = "Give";
    var color = "red";
    if (str === give) {
        return color;
    } else {
        color = "black";
        return color;
    }
};

function oddStatus(i) {
    // var url = i.split(")")[1];
    //url = url.split(".")[1];
    if (i.includes("H")) {
        i = "Home";
    } else if (i.includes("A")) {
        i = "Away";
    };
    return i;
}

exports.stream = async() => {
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.goto('https://555sports.com/football');
        const content = await page.content();
        const $ = cheerio.load(content);
        const matches = [];


        $('.match-item').each((idx, elem) => {
            let _href = $(elem).attr('href');
            let href = _href.replace('/detail/', '');
            const match = {
                link: 'http://localhost:3001' + $(elem).attr('href'),
                id: href,
                league: $(elem).find('.top-box .name').text(),
                time: $(elem).find('.text').text(),
                teams: [{
                    home: $(elem).find('.name-box .home').text(),
                    away: $(elem).find('.name-box .away').text()
                }]
            }
            console.log(match);
            matches.push(match);
            // return matches;
        });
        return matches;
        await browser.close();
    } catch (err) {
        console.log(err.message);
    }
}

exports.streamLink = async id => {
    let ret = [];
    try {
        let url = 'https://555sports.com/detail/' + id;
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(url);
        const content = await page.content();
        const $ = cheerio.load(content);
        let js = $('script:not([src])')[0].children[0].data;

        let stream = js.match(/m3u8Url:"([\s\S]*?)"/)[0];
        let mu = stream.replace('m3u8Url:', '');
        let m3u = unescape(JSON.parse(mu));

        let mat = {
            league: $('.top-box .name').text(),
            home: $('.name-box .home').text(),
            away: $('.name-box .away').text(),
            homeScore: $('.score-box .home').text(),
            awayScore: $('.score-box .away').text(),
            m3u8: m3u,
            watch: 'https://egohub.github.io/watch/?video=' + m3u
        }
        ret.push(mat);
        await browser.close();
        console.log(mat);
        return ret;
    } catch (err) {
        console.log(err);
    }
}
