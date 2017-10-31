import log4js from 'log4js';
import fs from 'fs';
let logger = log4js.getLogger();

let config = require("../Conf/log");
if(fs.existsSync(global['APP_PATH']+'/'))
log4js.configure(require(""));

const Logger = {
    debug:()=>{

    },
};
export default Logger;