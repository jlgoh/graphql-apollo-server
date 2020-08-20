const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String
    email: String
    contactNo: String!
    salary: Int
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee
  }
`;

module.exports = typeDefs;
