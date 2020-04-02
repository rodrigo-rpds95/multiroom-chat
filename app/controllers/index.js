module.exports.home = function(application, res){

	const menu = application.app.models.PagesDAO.getMenu;

	menu().then(result => {

		let groups = {};

		result.forEach((prop) => {

			if(prop.cat_status == 1) {

				if((groups[prop.cat_name]) == undefined) {	
					groups[prop.cat_name] = [];
				}
				  
				groups[prop.cat_name].push(prop);
			}		
		});

		res.render('index', {content: groups});

	});

	
}