const { ApolloServer, gql, ApolloError } = require("apollo-server");
const MoviesSchema = require("./schema/movie");
const SeriesSchema = require("./schema/serie");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis({ showFriendlyErrorStack: true });

const typeDefs = gql`
  type Structure {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Entertain {
    movies: [Structure]
    series: [Structure]
  }

  type Query {
    entertain: Entertain
  }

  type Mutation
`;

const resolvers = {
  Query: {
    async entertain() {
      try {
        const moviesData = await redis.get("movies:data");
        const seriesData = await redis.get("series:data");

        if (moviesData && seriesData) {
          console.log("From Redis mas bro..");
          return {
            movies: JSON.parse(moviesData),
            series: JSON.parse(seriesData),
          };
        } else {
          const { data: movies } = await axios({
            method: "get",
            url: "http://localhost:4001/movies",
          });
          const { data: series } = await axios({
            method: "get",
            url: "http://localhost:4002/series",
          });

          console.log("From Axiosmas broo...");
          await redis.set("movies:data", JSON.stringify(movies))
          await redis.set("series:data", JSON.stringify(series))
          return { movies, series };
        }
      } catch (err) {
        console.log(err);
        return new ApolloError(err);
      }
    },
  },
  //
  //
  Mutation: {},
};

const server = new ApolloServer({
  typeDefs: [typeDefs, MoviesSchema.typeDefs, SeriesSchema.typeDefs],
  resolvers: [resolvers, MoviesSchema.resolvers, SeriesSchema.resolvers],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
