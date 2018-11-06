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

const httpServer = express();
httpServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
myWebsocket.runOn(httpServer);
httpServer.use(fileUpload());
httpServer.use(express.static(staticPath));
// Register '.mustache' extension with The Mustache Express
httpServer.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', layoutsDir: layoutDir, partialsDir: partDir }));
httpServer.set('view engine', 'hbs');
httpServer.set('views', viewsDir);

httpServer.get(
    ["/", "/index", "/home"],
    (req, res, next) => {
        res.render('index.hbs', { Title: "NoveLore" });
    }
);

httpServer.get(
    ["/Stage1"],
    (req, res, next) => {
        res.render('stage1.hbs', { Title: "Stage 1" });
    }
)

httpServer.post(
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
httpServer /* 404 Must be at Bottom */
httpServer.use(function(req, res, next) {
    res.render('404.hbs', { Title: "404" });
});