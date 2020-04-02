const db = require('../../config/dbConnection.js');

module.exports.getCategory = function(url){
	return db('category').where({cat_url: url}).first();
}

module.exports.getRoom = function(url){
	return db('room').where({room_url: url}).first();
}

module.exports.getMenu = function(){
	return db('room').join(
		'category', 
		'room.cat_id', 
		'category.cat_id'
	);
}

