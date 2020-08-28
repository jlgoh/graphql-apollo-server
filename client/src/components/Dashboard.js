import React from "react";
import { Tabs } from "antd";
import EmployeeList from "./EmployeeList";
import AttendanceToday from "./AttendanceToday";

const { TabPane } = Tabs;

const Dashboard = () => {
  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Employee List" key="1">
        <EmployeeList />
      </TabPane>
      <TabPane tab="Today's Attendance" key="2">
        <AttendanceToday />
      </TabPane>
    </Tabs>
  );
};

export default Dashboard;
