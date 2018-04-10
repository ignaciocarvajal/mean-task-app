'use strict'
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();

//import rutes
// const route = require('./routes/index');
const taskRoute = require('./routes/task');

//setting
// app.set('views', path.join(__dirname,'./views'));
const port = process.env.PORT || 8080;
app.set('port', port);
// app.engine('html', require('ejs').renderFile);
// app.set('View engine', 'ejs');

//middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//route
// app.use(route);
app.use('/api', [taskRoute]);


//static files
app.use(express.static(path.join(__dirname, 'dist')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/dist/index.html'));
//   });


//start server
app.listen(port, ()=>{
    console.log(`server on port${port}`);
});