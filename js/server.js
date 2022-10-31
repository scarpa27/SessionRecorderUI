const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const app_name = "SessionRecorderUI";
const whitelist = ['https://session-recorder.herokuapp.com/', 'https://session-recorder-backend.herokuapp.com/']

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        if (whitelist.indexOf(origin) === -1) {
            let msg = "Forbidden access to "+origin+" due to cors policy";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../dist/'+app_name)));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
    next();
});
app.get('*', (req, res) => res.sendFile('index.html', {root: 'dist/'+app_name+'/'}));

app.listen(process.env.PORT || 8080);
