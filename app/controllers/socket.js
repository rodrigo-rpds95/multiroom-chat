function socket(app, chat_name) {

    const nsp = app.get('io').of(`/${chat_name}`);

    if(Object.keys(nsp.connected)[0] == undefined) {

        const users = {}; 
        
        nsp.on('connection', (socket) => {

            socket.on('privateMessage', function(data){
                socket.broadcast.to(data.id).emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem, private: true});
                socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem, private: true});
            });
                
            socket.on('disconnect', () => {
                console.log('Usuário desconectou');
                delete users[socket.id];

                nsp.emit(
                    'updateListUsers', 
                    users
                );

                // console.log(users);

            });

            socket.on('updateUsers', function(data){                   
                users[socket.id] = data.nick; 

                // console.log(users);

                nsp.emit(
                    'updateListUsers', 
                    users
                );
            });            
                
            socket.on('msgParaServidor', function(data){    

                nsp.emit(
                	'msgParaCliente', 
                	{apelido: data.apelido, mensagem: data.mensagem, private: false}
                );
                
            });

        });
        
    }

    return nsp;
}

module.exports = () => {
    return socket;
}