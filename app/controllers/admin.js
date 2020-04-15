const { validationResult } = require('express-validator');

module.exports.admin = function(application, req, res){

	if(req.session.authenticate === true){
		res.render('admin');	
	}else {
		res.render('login', {errors: {}});
	}		
}

module.exports.login = function(application, req, res){

	const dataForm = req.body;
	const getUser = application.app.models.PagesDAO.getUser;

	const validate = validationResult(req);

	getUser(dataForm.user, dataForm.password).then(result => {

		if (!validate.isEmpty() || result === undefined) {

			if(validate.errors.length === 0) validate.errors[0] = {msg: 'username or password is invalid'};

			res.render('login', {errors: validate.errors});
			return;

		}else{
			req.session.authenticate = true;
		}

		if(req.session.authenticate){
			res.render('admin', {errors: {}});
		}	
			
	});		
}

module.exports.logout = function(application, req, res){
	req.session.destroy(function(err){
		res.redirect('/admin');
	});	
}