const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const myWebsocket = require('./websocket.js');

const processor = require('../processor/processor.js');

const staticPath = path.join(appRoot, "/src/public");
const hostname = config.has('http.hostname') ? config.get('http.hostname') : '127.0.0.1';
const port = config.has('http.port') ? config.get('http.port') : 3000;

const viewsDir = path.join(appRoot, "/src/views");
const partDir = path.join(viewsDir, "/partials/");
const layoutDir = path.join(viewsDir, "/layouts");

const server = express();
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
myWebsocket.runOn(server);
server.use(fileUpload());
server.use(express.static(staticPath));
// Register '.mustache' extension with The Mustache Express
server.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', layoutsDir: layoutDir, partialsDir: partDir }));
server.set('view engine', 'hbs');
server.set('views', viewsDir);

server.get(
    ["/", "/index", "/home"],
    (req, res, next) => {
        res.render('index.hbs', { Title: "NoveLore" });
    }
);

server.get(
    ["/Stage1"],
    (req, res, next) => {
        res.render('stage1.hbs', { Title: "Stage 1" });
    }
)

server.post(
    ["/files"],
    (req, res, next) => {
        processor.inputFiles(req).then(
            (success) => {
                res.redirect("/stage1");
                //console.log(success);
            },
            (err) => {
                console.log(err);
            }
        )
    }
)



/* 404 Must be at Bottom */
server.use(function(req, res, next) {
    res.render('404.hbs', { Title: "404" });
});