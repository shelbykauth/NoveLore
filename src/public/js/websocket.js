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
            console.log("Invalid JSON", msg.data);
            return;
        }

        switch (json.type) {
            case "log":
                var logger = $("#nl_logger");
                logger.val(json.msg).trigger('update');
                break;
        }
    };

    window.WebSocketConnection = connection;
    return connection;
}

$(document).ready(() => {
    $("#nl_logger").on("update", () => {
        var logger = $(this);
        var newVal = logger.val();
        if (newVal == logger.data("oldVal")) return;
        logger.data("oldVal", newVal);
        logger.append("<p><span data-from='server'></span> " + newVal + "</p>");
    });
    startWS();
});