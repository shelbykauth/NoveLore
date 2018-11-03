const orp = require('object-resolve-path');

function processTemplate(html, obj) {
    htmlNew = html.toString();
    var htmlNew = htmlNew.replace(/\{\{([^\{\}]*)\}\}/g, (substr, group1) => {
        var returnVal = "*";
        try {
            returnVal = JSON.stringify(orp(obj, group1));
        } catch (e) {
            console.log(e);
        }
        return returnVal;
    });
    return htmlNew;
}

module.exports = {
    processTemplate: processTemplate,
}