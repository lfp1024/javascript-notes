const debug = require("debug")
const path = require("path")

/* 
开启打印 export DEBUG=DEV:debug:*
取消打印 unset DEBUG
*/
function debugGenerator(fileName) {
    return {
        debug: debug(`DEV:debug:${path.basename(fileName)}`),
        info: debug(`DEV:info:${path.basename(fileName)}`),
        error: debug(`@DEV:error:${path.basename(fileName)}`)
    }
}

module.exports = {
    debugGenerator
}