const resolvers = {
  Query: {
    employees: (_, __, { dataSources }) =>
      dataSources.jsonServerAPI.getEmployees(),
    employee: (_, { id }, { dataSources }) =>
      dataSources.jsonServerAPI.getEmployee(id),
  },
  Mutation: {
    addEmployee: (
      _,
      { employee: { id, name, email, contactNo, salary } },
      { dataSources }
    ) => {
      return {
        success: true,
        message: `Employee with name ${name} created successfully`,
        employee: dataSources.jsonServerAPI.createEmployee(
          name,
          email,
          contactNo,
          salary
        ),
      };
    },
    editEmployeeInfo: (
      _,
      { employee: { id, name, email, contactNo, salary } },
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
          salary
        ),
      };
    },
    removeEmployee: (_, { id }, { dataSources }) =>
      dataSources.jsonServerAPI.deleteEmployee(id),
  },
};
module.exports = resolvers;
