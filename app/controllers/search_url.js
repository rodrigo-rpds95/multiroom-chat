module.exports.searchURL = function(application, req, res){

    const SearchURL = new application.app.models.SearchURL(application);

    return SearchURL;
}