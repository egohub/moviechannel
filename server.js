const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

let movies = require('./v3/routes/movies');
let category = require('./v3/routes/category');
let yandex = require('./v3/routes/yandex');

app.use(movies);
app.use(category);
app.use(yandex);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('The party is on at port ' + port);
});