const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

let movies = require('./routes/movies');
let category = require('./routes/category');
let yandex = require('./routes/yandex');

app.use(movies);
app.use(category);
app.use(yandex);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('The party is on at port ' + port);
});