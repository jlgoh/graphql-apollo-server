const { RESTDataSource } = require("apollo-datasource-rest");

class JSONServerApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000";
  }

  async getEmployees() {
    const res = await this.get("employees");

    return res.map((employee) => this.employeeReducer(employee));
  }

  async getEmployee(id) {
    const res = await this.get(`employees/${id}`);

    return this.employeeReducer(res);
  }

  async createEmployee(name, companyEmail, contactNo, monthlySalary) {
    const res = await this.post("employees", {
      name,
      companyEmail,
      contactNo,
      monthlySalary,
    });

    return this.employeeReducer(res);
  }

  async updateEmployee(id, name, companyEmail, contactNo, monthlySalary) {
    const res = await this.put(`employees/${id}`, {
      id,
      name,
      companyEmail,
      contactNo,
      monthlySalary,
    });

    return this.employeeReducer(res);
  }

  async deleteEmployee(id) {
    try {
      await this.delete(`employees/${id}`);
      return "Deleted Successfully";
    } catch (err) {
      return "Not deleted";
    }
  }

  // Transform each returned Employee into expected format
  // in accordance with schema
  employeeReducer(employee) {
    return {
      id: employee.id,
      name: employee.name,
      email: employee.companyEmail,
      contactNo: employee.contactNo,
      salary: employee.monthlySalary,
    };
  }
}

module.exports = JSONServerApi;
