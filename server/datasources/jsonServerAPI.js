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
      attendance: [],
    });

    return this.employeeReducer(res);
  }

  async updateEmployee(id, name, companyEmail, contactNo, monthlySalary) {
    const res = await this.patch(`employees/${id}`, {
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

  async checkInEmployee(id, checkInDate, checkInTemp, task) {
    const { attendance } = await this.get(`employees/${id}`);

    //Push check in record to attendance array
    const update = [...attendance, { checkInDate, checkInTemp, task }];

    const res = await this.patch(`employees/${id}`, { attendance: update });

    return this.employeeReducer(res);
  }

  async checkOutEmployee(id, checkOutDate, checkOutTemp, statusUpdate) {
    const { attendance } = await this.get(`employees/${id}`);

    //From atttendance array, update record with same date
    attendance.forEach((record) => {
      if (
        new Date(record.checkInDate).toLocaleDateString() ===
        new Date(checkOutDate).toLocaleDateString()
      ) {
        record.checkOutDate = checkOutDate;
        record.checkOutTemp = checkOutTemp;
        record.statusUpdate = statusUpdate;
      }
    });

    const res = await this.patch(`employees/${id}`, { attendance });

    return this.employeeReducer(res);
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
      attendance: employee.attendance,
    };
  }
}

module.exports = JSONServerApi;
