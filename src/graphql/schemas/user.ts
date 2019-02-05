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
            
            login (email: String!, password: String!): Login!
        }
        type User {
            name: String 
        }
        type Me {
            first_name: String!
            email: String!
        }
        type Login {
            auth: Boolean!
            token: String
        }
    `
});
