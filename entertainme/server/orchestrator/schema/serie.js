const { gql, ApolloError } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis({ showFriendlyErrorStack: true });

module.exports = {
  //
  //
  typeDefs: gql`
    type Serie {
      _id: ID
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

    input SerieInput {
      title: String!
      overview: String!
      poster_path: String!
      popularity: Float
      tags: [String]
    }

    type ResponseSerie {
      message: String
    }

    extend type Mutation {
      addSeries(input: SerieInput): Serie
      deleteSerie(_id: ID): ResponseSerie
      editSerie(_id: ID, input: SerieInput): ResponseSerie
    }

    extend type Query {
      series: [Serie]
      serie(_id: ID): Serie
    }
  `,
  //
  //

  resolvers: {
    Query: {

      async series() {
        const seriesData = await redis.get("series:data");
        if (seriesData) {
          console.log("From Redis mas bro");
          return JSON.parse(seriesData);
        } else {
          try {
            const { data } = await axios({
              method: "get",
              url: "http://localhost:4002/series",
            });
            await redis.set("series:data", JSON.stringify(data));
            console.log("From Axios mas bro");
            return data;
          } catch (err) {
            console.log(err);
            return new ApolloError(err);
          }
        }
      },

      async serie(parent, args, context, info) {
        try {
          const seriesData = await redis.get("series:data");
          if (seriesData) {
            const serie = JSON.parse(seriesData).filter(
              (el) => el._id === args._id
            );
            if (serie) {
              console.log("From Redis mas broo");
              return serie[0];
            }
          } else {
            const { data } = await axios({
              method: "get",
              url: "http://localhost:4002/series/" + args._id,
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
      //
    },
    //
    //
    Mutation: {
      async addSeries(parent, args, context, info) {
        try {
          await redis.del("series:data");
          const { data } = await axios({
            method: "post",
            url: "http://localhost:4002/series",
            data: args.input,
          });
          return data[0];
        } catch (err) {
          console.log(err);
          return new ApolloError(err);
        }
      },

      async deleteSerie(parent, args, context, info) {
        try {
          await redis.del("series:data");
          const { data } = await axios({
            method: "delete",
            url: "http://localhost:4002/series/" + args._id,
          });
          if (data !== 0) {
            return { message: "Success delete a series" };
          } else {
            return { message: "Serie not found" };
          }
        } catch (err) {
          console.log(err);
          return new ApolloError(err);
        }
      },

      async editSerie(parent, args, context, info) {
        try {
          await redis.del("series:data");
          const { data } = await axios({
            method: "put",
            url: `http://localhost:4002/series/${args._id}`,
            data: args.input,
          });
          if (data.modifiedCount !== 0) {
            return { message: "Serie successfully updated" };
          } else {
            return { message: "Serie are not updated" };
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
