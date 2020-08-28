const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String
    email: String
    contactNo: String!
    salary: Int
    role: String
    dept: String
    attendance: [DailyRecord]
  }

  type DailyRecord {
    checkInDate: String
    checkInTemp: Float
    task: String
    checkOutDate: String
    checkOutTemp: Float
    statusUpdate: String
  }

  type Query {
    employees: [Employee]
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(employee: EmployeeInput): EmployeeUpdateResponse
    editEmployeeInfo(employee: EmployeeInput): EmployeeUpdateResponse
    removeEmployee(id: ID!): String
    checkInEmployee(id: ID!, dailyRecord: CheckInInput): EmployeeUpdateResponse
    checkOutEmployee(
      id: ID!
      dailyRecord: CheckOutInput
    ): EmployeeUpdateResponse
  }

  # To be passed into mutations
  input EmployeeInput {
    id: ID
    name: String
    email: String
    contactNo: String!
    salary: Int
    role: String
    dept: String
  }

  input CheckInInput {
    checkInTemp: Float
    task: String
  }

  input CheckOutInput {
    checkOutTemp: Float
    statusUpdate: String
  }

  # Response format for mutations
  type EmployeeUpdateResponse {
    success: Boolean!
    message: String
    employee: Employee
  }
`;

module.exports = typeDefs;
