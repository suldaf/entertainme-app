const axios = require("axios");

const Redis = require("ioredis");
const redis = new Redis({ showFriendlyErrorStack: true });

class MovieController {
  static async find(req, res) {
    try {
      const moviesData = await redis.get("movies:data");
      if (moviesData) {
        res.status(200).json(JSON.parse(moviesData));
        console.log("From Redis mas broo");
      } else {
        const { data: movies } = await axios({
          method: "get",
          url: "http://localhost:4001/movies",
        });
        await redis.set("movies:data", JSON.stringify(movies));
        console.log("From Axios mas broo");
        res.status(200).json(movies);
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(req, res) {
    try {
      const moviesData = await redis.get("movies:data");
      if (moviesData) {
        const movie = JSON.parse(moviesData).filter(
          (el) => el._id === req.params.id
        );
        if (movie) {
          console.log("From Redis mas broo");
          res.status(200).json(movie[0]);
        }
      } else {
        const { data } = await axios({
          method: "get",
          url: "http://localhost:4001/movies/" + req.params.id,
        });
        console.log("From Axios mas broo");
        res.status(200).json(data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async create(req, res) {
    try {
      await redis.del("movies:data");

      const { data: movie } = await axios({
        method: "post",
        url: "http://localhost:4001/movies",
        data: req.body,
      });

      res.status(201).json(movie);
    } catch (err) {
      console.log(err);
    }
  }

  static async remove(req, res) {
    try {
      await redis.del("movies:data");
      const id = req.params.id;
      const { data } = await axios({
        method: "delete",
        url: "http://localhost:4001/movies/" + id,
      });
      if (data) {
        res.status(200).json({ message: "Movie successfully deleted" });
      } else {
        res.status(404).json({ message: "Movie not found" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async update(req, res) {
    try {
      await redis.del("movies:data");
      const id = req.params.id;
      const { data } = await axios({
        method: "put",
        url: "http://localhost:4001/movies/" + id,
        data: req.body,
      });
      if (data.matchedCount) {
        if (data.modifiedCount) {
          res.status(200).json({ message: "Movie was updated" });
        } else {
          res.status(200).json({ message: "Movie are not updated" });
        }
      } else {
        res.status(404).json({ message: "Movie not found" });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = MovieController;
