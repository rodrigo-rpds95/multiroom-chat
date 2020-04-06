module.exports.categoria = function(application, req, res){

	const url_cat = req.params.cat;

	const category = application.app.models.PagesDAO.getCategory;

	category(url_cat).then(result => {

		result = result || {};

		if(Object.keys(result).length){

			res.render('category',  {content: result});		

		}else{
			res.status(404);
			res.render('404');
			return;
		}	

	}, err => {
		console.log(err);
	});
}