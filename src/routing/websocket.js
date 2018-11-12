const websocket = require('websocket');
const http = require('http');

/** @type {websocket.connection} */
const connections = [];
const triggers = [];
var wsServer;

module.exports = {
    /**
     * @param server {http.Server}
     */
    runOn: (server) => {
        wsServer = new websocket.server({
            httpServer: server,
        });
        wsServer.on('request', (request) => {
            var connection = request.accept(null, request.origin);
            connections.push(connection);
            connection.on('message', (data) => {
                if (data.type == 'utf8') {
                    var data = JSON.parse(data.utf8Data);
                    for (var i in triggers) {
                        var pair = triggers[i];
                        var mat = pair.objectToMatch;
                        //console.log(pair);
                        var trigger = true;
                        for (var j in mat) {
                            if (data[j] != mat[j]) trigger = false;
                        }
                        if (trigger) {
                            //console.log("matches");
                            pair.action(data, connection);
                        }
                    }
                } else {
                    console.log(`Unrecognized Data Type: ${data.type}`);
                }
            });
        });
    },
    sendMessage: (msg, conn) => {
        if (conn) {
            conn.send(msg);
        } else {
            for (var i in connections) {
                connections[i].send(msg);
            }
        }
    },
    sendLog: (msg, conn) => {
        msg = `<span class='time'>${new Date().toLocaleTimeString()}</span>` + JSON.stringify(msg);
        msg = JSON.stringify({ type: "log", msg: msg });
        if (conn) {
            conn.send(msg);
        } else {
            for (var i in connections) {
                connections[i].send(msg);
            }
        }
    },
    attachTrigger: (trigger, action) => {
        triggers.push({ objectToMatch: trigger, action: action });
    }
};