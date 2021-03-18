require('dotenv').config()

const express = require('express')

const app = express()
const port = process.env.PORT || 4002
const routes = require('./routes')

const { connect } = require('./config/mongoDb')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/series', routes)

connect().then(async () => {
  console.log(`MongoDb has connected`);

  // const movieCol = database.collection('Movies')

  // const movies = await movieCol.find().toArray()
  // console.log(movies);

  app.listen(port, () => console.log(`listening app at port: ${port}`))
})
