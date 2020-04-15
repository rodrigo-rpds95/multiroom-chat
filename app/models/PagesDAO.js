const db = require('../../config/dbConnection.js');

module.exports.getCategory = function(url){
	return db('category').join(
		'room', 
		'category.cat_id',
		'room.cat_id'
	).where({cat_url: url}).select('cat_name', 'cat_url', 'room_name', 'room_url');
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

module.exports.getUser = function(user, password){
	return db('admin').where({user, password}).first();
}

