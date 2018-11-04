const http = require('http');
const processor = require('./processor.js');
const fs = require('fs');

const webPath = appRoot + '/src/public/';
const hostname = config.has('http.hostname') ? config.get('http.hostname') : '127.0.0.1';
const port = config.has('http.port') ? config.get('http.port') : 3000;
const application = {};
const session = { "application": application };

const server = http.createServer((req, res) => {
    var page = { "session": session };
    res.statusCode = 200;
    if (false) {

    } else {
        if (req.url == "/") {
            returnPage("index");
        } else {
            returnPage(req.url);
        }
    }

    function returnPage(url) {
        fs.readFile(webPath + "/page/" + url + ".html", (err, html) => {
            if (err) {
                returnErr(err, res);
                return;
            }
            res.setHeader('Content-Type', 'text/html');
            page.url = url;
            html = processor.processTemplate(html, page);
            res.end(html);
        });
    }

    function returnErr(err) {
        console.log(err);
        var errorStatusCode = 500;
        switch (err.errno) {
            case -4058: //404
                errorStatusCode = 404;
                errorMessage = "Oops.  Page not found.";
                break;
            default:
                errorStatusCode = 500;
                errorMessage = "Oops.  The server had an oopsie.";
        }
        res.statusCode = errorStatusCode;
        page.errorStatus = errorStatusCode;
        page.errorMessage = errorMessage;
        returnPage("/error");
        return;
        fs.readFile(webPath + "/error/" + errorStatusCode + ".html", function(err2, html) {
            if (err2) {
                console.log(err2);
                res.statusCode = 500;
                res.statusMessage = err.message;
                res.end();
            } else {
                res.end(html);
            }
        });
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});