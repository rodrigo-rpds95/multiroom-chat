const db = require('../../../../config/dbConnection.js');
const {room: getRoom} = require('../Query')

module.exports = {
    async saveRoom(_, {input}){
        try{
            const [ id ] = await db('room').insert({                
                room_name: input.name,
                room_url: input.url,
                room_qtd: input.quantity,
                room_status: input.status,
                cat_id: input.category_id
            }) 

            return true

        }catch(e){
            throw new Error(e.sqlMessage)
        }

    },
    async deleteRoom(_, {id}){
        try{        
            const room = await getRoom(_, {id})      
            if(room){    
                await db('room').where({room_id: id}).delete()  
            }
            return room   
        }catch(e){
            throw new Error(e.sqlMessage)
        }
    },
    async updateRoom(_, {filter, input}){
        const id = filter
        try{ 
            const room = await getRoom(_, {id}) 

            if(room){
                await db('room').where({room_id: id}).update({
                    room_name: input.name,
                    room_url: input.url,
                    room_qtd: input.quantity,
                    room_status: input.status,
                    cat_id: input.category_id
                })
            }

            return true

        }catch(e){
            throw new Error(e.sqlMessage)
        }
    }

}