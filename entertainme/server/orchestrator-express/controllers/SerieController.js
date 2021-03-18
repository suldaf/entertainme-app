const axios = require("axios");

const Redis = require("ioredis");
const redis = new Redis({ showFriendlyErrorStack: true });

class SerieController {
  static async find(req, res) {
    try {
      const seriesData = await redis.get("series:data");
      if (seriesData) {
        res.status(200).json(JSON.parse(seriesData));
        console.log("From Redis mas broo");
      } else {
        const { data: series } = await axios({
          method: "get",
          url: "http://localhost:4002/series",
        });
        await redis.set("series:data", JSON.stringify(series));
        console.log("From Axios mas broo");
        res.status(200).json(series);
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async findById(req, res) {
    try {
      const seriesData = await redis.get("series:data");
      if (seriesData) {
        const serie = JSON.parse(seriesData).filter(
          (el) => el._id === req.params.id
        );
        if (serie) {
          console.log("From Redis mas broo");
          res.status(200).json(serie[0]);
        }
      } else {
        const { data } = await axios({
          method: "get",
          url: "http://localhost:4002/series/" + req.params.id,
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
      await redis.del("series:data");

      const { data: serie } = await axios({
        method: "post",
        url: "http://localhost:4002/series",
        data: req.body,
      });

      res.status(201).json(serie);
    } catch (err) {
      console.log(err);
    }
  }

  static async remove(req, res) {
    try {
      await redis.del("series:data");
      const id = req.params.id;
      const { data } = await axios({
        method: "delete",
        url: "http://localhost:4002/series/" + id,
      });
      if (data) {
        res.status(200).json({ message: "Serie successfully deleted" });
      } else {
        res.status(404).json({ message: "Serie not found" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async update(req, res) {
    try {
      await redis.del("series:data");
      const id = req.params.id;
      const { data } = await axios({
        method: "put",
        url: "http://localhost:4002/series/" + id,
        data: req.body,
      });
      if (data.matchedCount) {
        if (data.modifiedCount) {
          res.status(200).json({ message: "Serie was updated" });
        } else {
          res.status(200).json({ message: "Serie are not updated" });
        }
      } else {
        res.status(404).json({ message: "Serie not found" });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = SerieController;
