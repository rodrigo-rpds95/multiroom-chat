const db = require('../../../config/dbConnection.js');

module.exports = {
    categories() {
        return db('category')
    },
    category(_, { id }) {
        if(id){
            return db('category').where({cat_id: id}).first()
        }else{
            return null
        }
    },
    rooms() {
        return db('room').join(
            'category', 
            'room.cat_id', 
            'category.cat_id'
        )
    },
    room(_, { id }) {
        if(id){
            return db('room').where({room_id: id}).first()
        }else{
            return null
        }
    }
}