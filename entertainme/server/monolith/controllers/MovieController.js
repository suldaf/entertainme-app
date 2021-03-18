const { ObjectId } = require('bson');
const Movie = require('../models/Movie')


class MovieController {
  static async find(req,res){
    try {
      const movies = await Movie.find()

      res.json(movies)
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(req,res){
    try {
      const id = req.params.id
      const objId = ObjectId(id)
      const movie = await Movie.findById(objId)

      res.json(movie)
    } catch (err) {
      console.log(err);
    }
  }

  static async create(req,res){
    try {
      const movie = await Movie.create(req.body)

      res.json(movie.ops)
    } catch (err) {
      console.log(err);
    }
  }
  
  static async remove(req,res){
    try {
      const id = req.params.id
      const objId = ObjectId(id)
      const result = await Movie.remove(objId)

      res.status(200).json(result)
    } catch (err) {
      console.log(err);
    }
  }

  static async update(req,res){
    try {
      const id = req.params.id
      const objId = ObjectId(id)
      const data = {...req.body,tags: [...req.body.tags]}
      for (const key in data) {
        if (data[key]=== undefined || data[key] === '' || data[key] === null || data[key].length === 0 ) {
          delete data[key]
        }
      }
      const options = { upsert: true}
      const updateDoc = {
        $set: data
      }

      // console.log(objId);
      const result = await Movie.update(objId, updateDoc, options)

      res.json(result)

    } catch (err) {
      console.log(err);
    }
  }


}


module.exports = MovieController