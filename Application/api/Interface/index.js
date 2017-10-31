/// <reference path="../../../typings/globals/JikeJs/index.d.ts" />
//@ts-check
let { Interface, Route, Validate } = JikeJs;
import IndexController from '../Controller/index';
Interface.create('/', IndexController, [
    Route('/signin', 'post', 'index', {
        verify: {
            page: {
                mode: Validate.EXISTS_VALIDATE,
                rule: [
                    ['require', 'paramsNotNullErr']
                ]
            },
        }
    }),
]);