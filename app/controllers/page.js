const { validationResult } = require('express-validator');

module.exports.page = function(application, req, res){
	
	const url_cat = req.params.cat;
    const url_room = req.params.room;

	const page = application.app.models.PagesDAO.getRoom;

	page(url_room).then(result => {

		if(Object.keys(result).length){

			res.render('page',  {page_name: result.room_name, url: `/${url_cat}/${url_room}`, validacao: {}});
				
        }else{
			res.status(404);
            res.render('404');
			return;
        }

	});	
};

module.exports.room = function(application, req, res){

	const url_cat = req.params.cat;
    const url_room = req.params.room;
	const errors = validationResult(req);
	const dadosForm = req.body;

	const room = application.app.models.PagesDAO.getRoom;

	room(url_room).then(result => {

		if (!errors.isEmpty()) {
			res.render('page', {page_name: result.room_name, url: `/${url_cat}/${url_room}`, validacao: errors.errors});
			return;
		}

		const room_chat = application.app.controllers.socket(application, url_room);

		room_chat.emit(
			'msgParaCliente',
			{apelido: dadosForm.nick, mensagem: ' acabou de entrar no chat'}
		);

		res.render('room',  {room_name: result.room_name, url: url_room, data: dadosForm});
	});
};

module.exports.disconnect = function(application, req, res){
	
	const url = req.headers.referer;
	var pathname = new URL(url).pathname;
	const url_room = req.params.room;
	const room_chat = application.app.controllers.socket(application, url_room);

	room_chat.emit(
		'disconnect',
	);

	res.redirect(pathname);
}