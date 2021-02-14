import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
let adapter = new LocalStorage('db')
let db = low(adapter)

export default {
    methods: {
        createDB(){
            db.defaults({ basket: [] }).write()
        },

        pushToDB(DB, value){
            db.get(DB).push(value).write()
        },

        getDB(DB){
            return db.get(DB).value()
        }
    },
}