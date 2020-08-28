const resolvers = {
  //Queries as specified in schema.
  Query: {
    employees: (_, __, { dataSources }) =>
      dataSources.jsonServerAPI.getEmployees(),
    employee: (_, { id }, { dataSources }) =>
      dataSources.jsonServerAPI.getEmployee(id),
  },
  //Mutations as specified in schema.
  Mutation: {
    addEmployee: (
      _,
      { employee: { id, name, email, contactNo, salary, role, dept } },
      { dataSources }
    ) => {
      return {
        success: true,
        message: `Employee with name ${name} created successfully`,
        employee: dataSources.jsonServerAPI.createEmployee(
          name,
          email,
          contactNo,
          salary,
          role,
          dept
        ),
      };
    },

    editEmployeeInfo: (
      _,
      { employee: { id, name, email, contactNo, salary, role, dept } },
      { dataSources }
    ) => {
      return {
        success: true, // Should check if success instead of hardcode e.g. check status code
        message: `Employee with name ${name} updated successfully`, // Should check if success instead of hardcode e.g. check status code
        employee: dataSources.jsonServerAPI.updateEmployee(
          id,
          name,
          email,
          contactNo,
          salary,
          role,
          dept
        ),
      };
    },

    removeEmployee: (_, { id }, { dataSources }) =>
      dataSources.jsonServerAPI.deleteEmployee(id),

    checkInEmployee: (
      _,
      { id, dailyRecord: { checkInTemp, task } },
      { dataSources }
    ) => {
      return {
        success: true,
        message: `Employee with id ${id} has successfully checked in`,
        employee: dataSources.jsonServerAPI.checkInEmployee(
          id,
          new Date().toLocaleString(),
          checkInTemp,
          task
        ),
      };
    },

    checkOutEmployee: (
      _,
      { id, dailyRecord: { checkOutTemp, statusUpdate } },
      { dataSources }
    ) => {
      return {
        success: true,
        message: `Employee with id ${id} has successfully checked out`,
        employee: dataSources.jsonServerAPI.checkOutEmployee(
          id,
          new Date().toLocaleString(),
          checkOutTemp,
          statusUpdate
        ),
      };
    },
  },
};
module.exports = resolvers;
