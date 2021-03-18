const router = require("express").Router();
const moviesRoute = require("./moviesRoute");
const seriesRoute = require("./seriesRoute");
const axios = require("axios");
router.get("/", async (req, res) => {
  try {
    const { data: movies } = await axios({
      method: "get",
      url: "http://localhost:4001/movies",
    });
    const { data: series } = await axios({
      method: "get",
      url: "http://localhost:4002/series",
    });

    res.json({ movies, series });
  } catch (err) {
    console.log(err);
  }
});

router.use("/movies", moviesRoute);
router.use("/series", seriesRoute);

module.exports = router;
