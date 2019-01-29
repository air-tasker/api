const { makeExecutableSchema } = require('graphql-tools');

module.exports = makeExecutableSchema({
    typeDefs: `
        type Query {
            users: User,
            me: Me
        }
        type Mutation {
            register(name: String!, phone: String!, password: String!): Me!,
            login (phone: String!, password: String!): Login!
        }
        type User {
            name: String 
        }
        type Me {
            username: String!,
            phone: String!,
            token: String!
        }
        type Login {
            auth: Boolean!
            token: String!
        }
    `
});
