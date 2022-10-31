const express = require('express');
const path = require('path');
const app = express();

const app_name = "SessionRecorderUI"

app.use(express.static(__dirname + '../dist/'+app_name));
app.get('/*', (req, res) => res.sendFile('index.html', {root: 'dist/'+app_name+'/'}))

app.listen(process.env.PORT || 8080);
