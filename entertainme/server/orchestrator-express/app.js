require("dotenv").config();

const express = require("express");

const app = express();
const port = 4000;
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// const movieCol = database.collection('Movies')

// const movies = await movieCol.find().toArray()
// console.log(movies);

app.listen(port, () => console.log(`listening app at port: ${port}`));
