const moment = require('moment');

function formatMsg(username,text)
{
    return{
        username,
        text,
        time: moment().format('h:mm a') //use of momment module
    }
}

module.exports = formatMsg;