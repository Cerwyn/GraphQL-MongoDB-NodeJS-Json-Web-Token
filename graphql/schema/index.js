const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type User{
    _id: ID!
    email: String!
    password: String
}

type Book{
    _id: ID!
    title: String!
    description: String!
    ownedBy: User!
}

type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input InputUser{
    email: String!
    password: String!
}

input InputBook{
    title: String!
    description: String!
}

input InputUpdateBook{
    id: String!
    title: String
    description: String
}

type RootQuery {
    user(email: String!): User!
    book: [Book!]
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createUser(inputUser: InputUser): User
    addBook(inputBook: InputBook): Book
    deleteBook(id: String!): Book!
    updateBook(inputUpdateBook: InputUpdateBook): Book!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);