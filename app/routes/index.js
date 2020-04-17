var { check } = require('express-validator');

module.exports = function(application){

    application.get('/', (req, res) => {
        application.app.controllers.index.home(application, res);
    });

    application.get('/disconnect', (req, res) => {
        application.app.controllers.page.disconnect(application, req, res);
    });
    
    application.get('/logout', (req, res) => {
        application.app.controllers.admin.logout(application, req, res);
    });    

    application.get('/admin', (req, res) => {
        application.app.controllers.admin.admin(application, req, res);
    });

    application.post('/admin', [
        check('user').not().isEmpty().withMessage('type a name'),
        check('password').not().isEmpty().withMessage('type a password'),
        check('password').isLength({ min: 3, max: 20 }).withMessage('the password must be between 3 and 20 characters')
    ], (req, res) => {
        application.app.controllers.admin.login(application, req, res);
    });

    application.get('/:cat', (req, res) => {
        application.app.controllers.categoria.categoria(application, req, res);
    });

    application.get('/:cat/:room', (req, res) => {
        
        application.app.controllers.page.page(application, req, res);
    });

    application.post('/:cat/:room',  [
        check('nick').not().isEmpty().withMessage('Preencha um nome'),
        check('nick').isLength({ min: 3, max: 20 }).withMessage('O nome deve ter de 3 a 20 caracteres')
    ], (req, res) => {
        application.app.controllers.page.room(application, req, res);
    });    

}
