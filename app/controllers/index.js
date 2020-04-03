module.exports.home = function(application, res){

	const menu = application.app.models.PagesDAO.getMenu;

	menu().then(result => {

		let groups = {};

		result.forEach((prop) => {

			if(prop.cat_status == 1) {

				if((groups[prop.cat_url]) == undefined) {	
					groups[prop.cat_url] = [];
				}
				  
				groups[prop.cat_url].push(prop);
			}		
		});

		res.render('index', {content: groups});

	});

	
}