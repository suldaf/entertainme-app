const Movie = require("../models/Movie");
const { ObjectId } = require("bson");

class MovieController {
  static async find(req, res) {
    try {
      const movies = await Movie.find();

      res.json(movies);
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(req, res) {
    try {
      const id = req.params.id;
      const objId = ObjectId(id);
      const movie = await Movie.findById(objId);

      res.json(movie);
    } catch (err) {
      console.log(err);
    }
  }

  static async create(req, res) {
    try {
      const movie = await Movie.create(req.body);

      res.json(movie.ops);
    } catch (err) {
      console.log(err);
    }
  }

  static async remove(req, res) {
    try {
      const id = req.params.id;
      const objId = ObjectId(id);
      // const { deleteCount: count } = await Movie.remove(objId);
      const { deletedCount } = await Movie.remove(objId);
      console.log(deletedCount);
      res.status(200).json(deletedCount);
    } catch (err) {
      console.log(err);
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const objId = ObjectId(id);
      const movie = { ...req.body, tags: [...req.body.tags] };
      for (const key in movie) {
        if (
          movie[key] === undefined ||
          movie[key] === "" ||
          movie[key] === null ||
          movie[key].length === 0
        ) {
          delete movie[key];
        }
      }
      const options = { upsert: true };
      const updateDoc = {
        $set: movie,
      };

      const result = await Movie.update(objId, updateDoc, options);
      res.json(result);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = MovieController;
