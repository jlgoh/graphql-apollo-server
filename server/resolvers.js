const resolvers = {
  Query: {
    employees: (_, __, { dataSources }) =>
      dataSources.jsonServerAPI.getEmployees(),
    employee: (_, { id }, { dataSources }) => {
      return dataSources.jsonServerAPI.getEmployee(id);
    },
  },
};

module.exports = resolvers;
