const {MongoClient} = require('mongodb')

 let database = null

 async function connect() {
  // Replace the following with your MongoDB deployment's connection string.
  try {
    const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASS}@${process.env.CLUSTERURL}?retryWrites=true&w=majority`;
  
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    
    await client.connect()

    const db = client.db('entertainme')

    database = db
    return db

  } catch (err) {
    console.log(err);
  }

}

function getDb() {
  return database
}

module.exports = {
  connect,
  getDb
}