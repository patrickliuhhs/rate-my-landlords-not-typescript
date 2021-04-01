const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose')
require('dotenv').config()
const Landlords = require('./models/Landlords')
const Users = require('./models/Users')
const RealEstateProperty = require('./models/RealEstateProperty')
const Reviews = require('./models/Reviews')
const { findLandlordsByAddress } = require('./controllers/findLandlordsByAddress')
const { findLandordById } = require('./controllers/findLandlordById')

/* DATABASE CONNECTION */
mongoose.connect(
  process.env.DB_CONNECTION_STRING,  
  {useNewUrlParser: true, useUnifiedTopology: true }, 
  () => console.log('connected to db')
)
 
const db = mongoose.connection 

const typeDefs = gql`
  type LandlordSearchResult {
    name: String 
    id: ID 
    street: String 
    city: String 
    state: String 
    zipcode: String
  }

  type LandlordStats {
    name: String
    overallRating: Int 
    wouldRentAgainLevel: Int 
    tags: [String]
    friendlinessRating: Int 
    communicationRating: Int 
    maintenanceRating: Int
    responsivenessRating: Int
    transactionsIssues: Int
  }

  type PropertyStats {
    cleanliness: Int
    noiseLevel: Int 
    commonPropertyIssues: [String]
    commonNeighborTrais: [String]
  }

  type LandlordReview {
    wouldRentAgain: Boolean
    friendlinessRating: Int
    communicationRating: Int 
    responsivenessRating: Int
    maintenanceRating: Int
    transactionIssues: Boolean 
  }

  type PropertyReview {
    moveInDate: String
    moveOutDate: String
    cleanliness: Int
    neighborsVibes: [String]
    propertyIssues: [String]
    noiseLevelRating: Int
    user: String
  }

  type User {
    name: String
    username: String
    email: String
    DOB: String
    properties: [ID]
  }

  type FullLandLordProfile {
    LandlordStats: LandlordStats 
    PropertyStats: PropertyStats
    LandlordReviews: [LandlordReview]
    PropertyReviews: [PropertyReview]
  }

  input Address {
    street: String, 
    city: String, 
    state: String, 
    zipcode: String
  }
  type Query {
    hello: String, 
    findLandlordsByAddress(street: String, city: String, state: String, zipcode: String): [LandlordSearchResult], 
    findLandordById(id: ID) : FullLandLordProfile,
    getProperties: String
  }
`;
 
const resolvers = {
  Query: {
    findLandlordsByAddress,
    findLandordById,
    hello: () => 'hello', 
    getProperties: async (__, args, context) => {
      const data = await context.RealEstateProperty.find({})
      console.log(data)
      return 'hello'
    }
  },
};
 
const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context:  {
    Landlords, 
    Users, 
    RealEstateProperty, 
    Reviews,
  }
});
 

const app = express();
server.applyMiddleware({ app });
 
app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
