import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Dashboard = () => {
  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Employee List" key="1">
        Employee List
      </TabPane>
      <TabPane tab="Today's Attendance" key="2">
        Today's Attendance
      </TabPane>
    </Tabs>
  );
};

export default Dashboard;
