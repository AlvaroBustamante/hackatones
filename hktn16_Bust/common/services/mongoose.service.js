const mongoose = require('mongoose');
let count = 0;

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true
    
};
const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect("mongodb://root:root@ac-lyrwk93-shard-00-00.ywec0a1.mongodb.net:27017,ac-lyrwk93-shard-00-01.ywec0a1.mongodb.net:27017,ac-lyrwk93-shard-00-02.ywec0a1.mongodb.net:27017/?replicaSet=atlas-62oqpf-shard-0&ssl=true&authSource=admin", options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

exports.mongoose = mongoose;
