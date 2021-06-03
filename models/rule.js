const pool = require('../middleware/pool')

class Rule{
    constructor(rule){
        this.rule = rule
    }

    create() {
        try{
            pool.query('Insert into Rules (rule) values (?)', [this.rule])
        }
        catch (e){
            console.log(e)
        }
    }
    delete(id){
        try {
            console.log(id)
            pool.query('delete from Rules where id=?', [id])
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = Rule