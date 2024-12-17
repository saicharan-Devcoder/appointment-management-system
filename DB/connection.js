const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectWithPool = async () => {
  try{
  mongoServer = await MongoMemoryServer.create();

  const mongoURI = mongoServer.getUri();

  await mongoose.connect(mongoURI);
  console.log('Connected to in-memory MongoDB with a connection pool');
}catch(err){
console.log('Error in connecting DB',JSON.stringify(err));
}
};

const disconnect = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log('Disconnected and stopped in-memory MongoDB');
};

module.exports = { connectWithPool, disconnect };
