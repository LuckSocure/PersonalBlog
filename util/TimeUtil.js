
function getNow () {
    return parseInt(Date.now() / 1000)
}

function timeFormat (unixtime) {
    var date = new Date(unixtime * 1000);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

module.exports.getNow = getNow;
module.exports.timeFormat = timeFormat;
