const endConnection = (connection) => {

	connection.end((err) => {
		console.log("bd desconectado - " + err);
	});	

}

module.exports = () => {
	return endConnection;
}