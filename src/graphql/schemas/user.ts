const { makeExecutableSchema } = require('graphql-tools');

module.exports = makeExecutableSchema({
    typeDefs: `
        type Query {
            users: User,
            me: Me
        }
        type Mutation {
        
            register_employer_individual(
                first_name: String!, 
                last_name: String!, 
                email: String!, 
                phone: String!, 
                password: String!, 
                password_repeat: String!
            ): Me!
            
            login (email: String!, password: String!): Me!
        }
        type User {
            name: String 
        }
        type Me {
            id: ID!,
            first_name: String!, 
            last_name: String!, 
            email: String!, 
            phone: String!,
            access_token: String!
        }
        type Login {
            auth: Boolean!
            token: String
        }
    `
});
