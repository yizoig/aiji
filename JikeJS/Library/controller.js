module.exports = class Controller {

    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    json(data) {
        this.res.json({
            code: 0,
            data
        })
    }
    header(key,value){

        this.res.header(key,value);
    }
    status(status){
        this.res.status(status);
    }
}