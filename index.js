require('dotenv').config()
const express = require('express');
const app = express()
const ora = require('ora')
const path = require('path');
const MongoDB = require('./methods/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join('./public')));
app.set('public', path.join(__dirname, 'public'));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

async function init() {
    await MongoDB.init();
    
    app.use('/', require('./router/routes'));

    app.listen(3000, () => {
    const a = ora({
        text: 'Started server at PORT: 3000',
        spinner: 'dots',
        color: 'cyan'
    }).start();
    a.stop()
})
}
init()