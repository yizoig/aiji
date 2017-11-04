//yizo库
require('../Library/Array');
let Controller = require('./controller');
let Model = require('./model');
let { Code } = require('../Code/code');
let { Interface, Route } = require('./interface');
let { ValidationError, BaseError } = require('./error');
let encrypt = require('./encrypt');
let request = require('./request');
import {Logger} from './log4js';
import Validate from './validate';

global['JikeJs'] = {
    Controller,Model,Interface,Route,ValidationError, BaseError ,Validate,encrypt ,Code,request,Logger
};