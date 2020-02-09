const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connectionUrl = 'mongodb://localhost:27017/Project';

mongoose.connect(connectionUrl, {
                                    useNewUrlParser: true,
                                    useUnifiedTopology: true 
                                })
                                
.catch((e) => console.error(e));

const db = mongoose.connection;

db.on('connected', () => {
    console.log(`mongoose connectio open on ${connectionUrl}`)
});

db.on('error', (err) => console.error(err));

db.on('disconnected', () => {
    console.log('mongoose connection disconnect')
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log('mongoose connection close throw app termonatinfo')
        process.exit(0);
    })
})



