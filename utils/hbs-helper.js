module.exports = {
    ifeq(a,b, options){
        if(a===b){
            return options.fn(this)
        }
        return options.inverse(this)
    },
    if_eq(a,b, options){
        if(a<b){
            return options.fn(this)
        }
        return options.inverse(this)
    }
}