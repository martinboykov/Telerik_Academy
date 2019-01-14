/* globals __dirname */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const init = (data) => {
    const app = express();

    const staticsPath = path.join(__dirname, '../static');
    app.use('/static', express.static(staticsPath));

    const libsPath = path.join(__dirname, '../node_modules');
    app.use('/libs', express.static(libsPath));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    require('./auth').applyTo(app, data);

    app.set('view engine', 'pug');
    require('./routers')
        .attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
