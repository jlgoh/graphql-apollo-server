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

  type Mutation {
    addEmployee(employee: EmployeeInput): EmployeeUpdateResponse
    editEmployeeInfo(employee: EmployeeInput): EmployeeUpdateResponse
    removeEmployee(id: ID!): String
  }

  # To be passed into mutations
  input EmployeeInput {
    id: ID
    name: String
    email: String
    contactNo: String!
    salary: Int
  }

  # Response format for mutations
  type EmployeeUpdateResponse {
    success: Boolean!
    message: String
    employee: Employee
  }
`;

module.exports = typeDefs;
