/**
 * 
 * @param {Object<string, function} functions onopen, onclose, onerror, onmessage
 * @return {WebSocket.connection} connection 
 */
function startWS() {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    if (!window.WebSocket) return null;

    var url = window.location;
    var connection = new WebSocket(url.origin.replace(url.protocol, "ws:").replace(url.port, "1337"));

    connection.onopen = () => {};
    connection.onclose = (close) => {
        setTimeout(startWS, 200);
        console.log(close);
    };
    connection.onerror = (err) => {
        console.log(err);
    };
    connection.onmessage = (msg) => {
        try {
            var json = JSON.parse(msg.data);
        } catch (e) {
            console.log("Invalid JSON", msg.data, msg);
            return;
        }

        switch (json.type) {
            case "log":
                var logger = $("#nl_logger");
                console.log(json.msg);
                logger.data("newVal", json.msg).trigger('update');
                break;
            default:
                console.log(json);
        }
    };

    window.WebSocketConnection = connection;
    return connection;
}

$(document).ready(() => {
    $("#nl_logger").on("update", function() {
        var logger = $(this);
        console.log(logger);
        var newVal = logger.data("newVal");
        if (newVal == logger.data("oldVal")) return;
        logger.data("oldVal", newVal);
        logger.append("<p><span data-from='server'></span> " + newVal.replace(/\\\\/g, "/") + "</p>");
    });
    startWS();
});