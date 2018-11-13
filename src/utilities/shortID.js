var lastMS = 0;

/**
 * return {String}
 */
function generateShortID() {
    var ms = new Date().getTime();
    if (ms <= lastMS) {
        ms = lastMS + 1;
    }
    lastMS = ms;
    var str = ms.toString(32);
    str = str.substring(5, 9) + str.substr(0, 5);
    return str;
}


module.exports = {
    generateShortID: generateShortID,
}