import log4js from 'log4js';
let cheese = ['info', 'warn', 'debug', 'error', 'fatal'];
let appenders = APP_DEBUG ? {
    console: {
        type: 'console'
    }
} : {};
let categories = {
    default: {
        appenders: ['info'], level: "all"
    }
};
for (let i in cheese) {
    let level = cheese[i];
    appenders[level] = {
        type: "dateFile",
        filename: APP_PATH + "/Runtime/Logs/",
        //目录
        pattern: "/yyyy/MM-dd." + level + ".log",
        //命名规则，我们是按天，也可以设置为yyyyMMddhh.log，为按时
        absolute: true,
        maxLogSize: 10 * 1000 * 1000,
        numBackups: 3,
        alwaysIncludePattern: true
    };
    categories[level] = {
        appenders: [level].concat(APP_DEBUG ? ['console'] : []), level: level
    };
}
let config = {
    appenders,
    categories
};
log4js.configure(config);
//普通信息
const loggerInfo = log4js.getLogger("info");
//警告
const loggerWarn = log4js.getLogger("warn");
//调试
const loggerDebug = log4js.getLogger("debug");
//错误
const loggerError = log4js.getLogger("error");
//严重错误
const loggerFatal = log4js.getLogger("fatal");
const Logger = {
    info: (mes = '') => {
        // loggerInfo.level = "info";
        loggerInfo.info(mes);
    },
    warn: (mes = '') => {
        loggerWarn.warn(mes);
    },
    debug: (mes = '') => {
        loggerDebug.debug(mes);
    },
    error: (mes = '') => {
        loggerError.error(mes);
    },
    fatal: (mes = '') => {
        loggerFatal.fatal(mes);
    },
};
export {
    Logger, log4js
};
