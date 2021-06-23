module.exports = {
    ifeq(a,b, options){
        if(a===b){
            return options.fn(this)
        }
        return options.inverse(this)
    },
    times(n, block) {
        var accum = '';
        for(var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
    }
}