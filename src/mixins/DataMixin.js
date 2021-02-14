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

        removeFromDB(DB, value){
            db.get(DB)
              .remove(value)
              .write()
        },

        clearDB(){
            db.set('basket', [])
              .write()
        },

        getDB(DB){
            return db.get(DB).value()
        },

        addQuantity(item) {
            if(item.quantity <= 4){
                item.quantity++

                db.get('basket')
                  .find({ id: item.id })
                  .assign({ title: 'hi!'})
                  .write()
            }
        },

        lowerQuantity(item) {
            if(item.quantity >=2){
                item.quantity--

                db.get('basket')
                  .find({ id: item.id })
                  .assign({ title: 'hi!'})
                  .write()
            }
        },


    },
}