var { check } = require('express-validator');

module.exports = function(application){

    application.get('/', (req, res) => {
        application.app.controllers.index.home(application, res);
    });

    application.get('/admin', (req, res) => {
        application.app.controllers.admin.admin(application, req, res);
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
