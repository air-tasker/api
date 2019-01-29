const { makeExecutableSchema } = require('graphql-tools');

module.exports = makeExecutableSchema({
    typeDefs: `
        type Query {
            users: User,
            me: Me
        }
        type Mutation {
            register(username: String!, email: String!, password: String!, birthyear: Int!): Me!,
            login (email: String!, password: String!): Login!
        }
        type User {
            name: String 
        }
        type Me {
            username: String!
            email: String!
            token: String!
        }
        type Login {
            auth: Boolean!
            token: String
        }
    `
});
