const app = require('./config/server');
const server = app.listen(8080, () => {
    console.log('servidor online');
});

const io = require('socket.io')(server);

app.set('io', io);
