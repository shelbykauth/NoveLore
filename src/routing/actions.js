const websocket = require('./websocket.js');
const processor = require('../processor/processor.js');

websocket.attachTrigger({ "messageType": "trigger", "action": "unzip" },
    (message, conn) => {
        console.log("Triggered");
        processor.unzip().then((data) => {
            //console.log(data);
            var log = "The following files were unzipped:<br>" + data.join("<br>");
            websocket.sendLog(log, conn);
        });
    }
)