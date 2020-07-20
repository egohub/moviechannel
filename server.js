const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static((__dirname, 'x')));

let movies = require('./routes/movies');
let category = require('./routes/category');
let yandex = require('./routes/yandex');
let xxx = require('./routes/xxx');
let zmovies = require('./routes/zmovies');
let soccer = require('./routes/soccer');
const scrap = require('./routes/sports');

app.use(movies);
app.use(category);
app.use(yandex);
app.use(xxx);
app.use(zmovies);
app.use(soccer);

app.get('/odd', async(req, res) => {
    const data = await scrap.soccerOdd();
    res.send(data);
});

app.get('/stream', async(req, res) => {
    const data = await scrap.stream();
    res.send(data);
});

app.get('/stream/detail/:id', async(req, res) => {
    const id = req.params.id;
    const data = await scrap.streamLink(id);
    res.send(data);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('The party is on at port ' + port);
});
