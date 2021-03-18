const { gql, ApolloError } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis({ showFriendlyErrorStack: true });

module.exports = {
  //
  //
  typeDefs: gql`
    type Movie {
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    input MovieInput {
      title: String!
      overview: String!
      poster_path: String!
      popularity: Float
      tags: [String]
    }

    type ResponseMovie {
      message: String
    }

    extend type Mutation {
      addMovie(input: MovieInput): Movie
      deleteMovie(_id: ID): ResponseMovie
      editMovie(_id: ID, input: MovieInput): ResponseMovie
    }

    extend type Query {
      movies: [Movie]
      movie(_id: ID): Movie
    }
  `,
  //
  //

  resolvers: {
    Query: {
      async movies() {
        try {
          const moviesData = await redis.get("movies:data");
          if (moviesData) {
            console.log("From Redis mas broo");
            return JSON.parse(moviesData);
          } else {
            const { data } = await axios({
              method: "get",
              url: "http://localhost:4001/movies",
            });
            await redis.set("movies:data", JSON.stringify(data));
            console.log("From Axios mas broo");
            return data;
          }
        } catch (err) {
          console.log(err);
          return new ApolloError(err);
        }
      },

      async movie(parent, args, context, info) {
        try {
          const moviesData = await redis.get("movies:data");
          if (moviesData) {
            const movie = JSON.parse(moviesData).filter(
              (el) => el._id === args._id
            );
            if (movie) {
              console.log("From Redis mas broo");
              return movie[0];
            }
          } else {
            const { data } = await axios({
              method: "get",
              url: "http://localhost:4001/movies/" + args._id,
            });
            console.log("From Axios mas broo");
            return data[0];
          }
        } catch (err) {
          console.log(err);
          return new ApolloError(err);
        }
      },
      //
    },
    //
    //
    Mutation: {
      async addMovie(parent, args, context, info) {
        try {
          await redis.del("movies:data");
          const { data } = await axios({
            method: "post",
            url: "http://localhost:4001/movies",
            data: args.input,
          });
          console.log(data);
          return data[0];
        } catch (err) {
          console.log(err);
          return new ApolloError(err);
        }
      },



      async deleteMovie(parent, args, context, info) {
        try {
          await redis.del("movies:data");
          const { data } = await axios({
            method: "delete",
            url: "http://localhost:4001/movies/" + args._id,
          });
          console.log(data);
          if (data !== 0) {
            console.log('Success delete a movie');
            return { message: 'Success delete a movie' };
          } else {
            return { message: "Movie not found" };
          }
        } catch (err) {
          console.log(err);
          return new ApolloError(err);
        }
      },

      async editMovie(parent, args, context, info) {
        try {
          await redis.del("movies:data");
          const { data } = await axios({
            method: "put",
            url: `http://localhost:4001/movies/${args._id}`,
            data: args.input,
          });
          console.log(data);
          if (data.modifiedCount !== 0) {
            console.log('Movie successfully updated')
            return { message: "Movie successfully updated" };
          } else {
            return { message: "Movie are not updated" };
          }
        } catch (err) {
          console.log(err);
          return new ApolloError(err);
        }
      },
      //
    },
    //
  },
};
