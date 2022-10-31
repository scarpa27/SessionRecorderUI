const express = require('express');
const path = require('path');
const app = express();

const app_name = "SessionRecorderUI"

app.use(express.static(path.join(__dirname, '../dist/'+app_name)));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
    next();
});
app.get('*', (req, res) => res.sendFile('index.html', {root: 'dist/'+app_name+'/'}));

app.listen(process.env.PORT || 8080);
