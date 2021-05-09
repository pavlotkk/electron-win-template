class Exception{
    constructor(code, message){
        this.code = code,
        this.message = message
    }

    toString(){
        return this.message;
    }
}