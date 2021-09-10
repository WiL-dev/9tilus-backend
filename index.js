const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const tumblr = require('tumblr.js');
const config = require('./config');

const client = tumblr.createClient({
  credentials: {
    consumer_key: config.tumblr_key,
    consumer_secret: config.tumblr_secret,
    token: config.tumblr_token,
    token_secret: config.tumblr_token_secret
  },
  returnPromises: true
});

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    userInfo: String
  }
  type Mutation {
    createTextPost(title: String, body: String!): String
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world :)';
  },
  userInfo: async () => {
    const userInfo = await client.userInfo();
    return JSON.stringify(userInfo);
  },
  createTextPost: async ({title, body}) => {
    const newPost = await client.createTextPost(
      config.tumblr_blog_name,
      {
        title: title,
        body: body,
        state: 'queue'
      }
    );
    return JSON.stringify(newPost);
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
}));

app.listen(config.port, () => {
  console.log(`Example app listening at http://localhost:${config.port}/graphql`)
});
