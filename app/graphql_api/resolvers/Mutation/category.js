const db = require('../../../../config/dbConnection.js');
const {category: getCategory} = require('../Query')

module.exports = {
    async saveCategory(_, {input}){
        try{
            const [ id ] = await db('category').insert({
                cat_name: input.name,
                cat_url: input.url,
                cat_status: input.status
            }) 

            return true

        }catch(e){
            throw new Error(e.sqlMessage)
        }

    },
    async deleteCategory(_, {id}){
        try{        
            const category = await getCategory(_, {id})      
            if(category){    
                await db('category').where({cat_id: id}).delete()  
            }
            return category   
        }catch(e){
            throw new Error(e.sqlMessage)
        }
    },
    async updateCategory(_, {filter, input}){
        const id = filter
        try{ 
            const category = await getCategory(_, {id}) 

            if(category){
                await db('category').where({cat_id: id}).update({
                    cat_name: input.name,
                    cat_url: input.url,
                    cat_status: input.status
                })
            }

            return true

        }catch(e){
            throw new Error(e.sqlMessage)
        }
    }
}