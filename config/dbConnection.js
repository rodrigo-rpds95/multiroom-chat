const config = require('./knexfile.js')
module.exports = require('knex')(config)

// const mysql = require('mysql');

// const connMySQL = () => {

//     console.log('conexão com o bd foi estabelecida');
    
// 	return mysql.createConnection({
// 		host: 'localhost',
// 		user: 'root',
// 		password: '',
// 		database: 'chat' 
// 	}) ;

// }

// module.exports = () => {
// 	return connMySQL;
// }