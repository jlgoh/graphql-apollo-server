import React from "react";
import Dashboard from "./Dashboard";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "./App.css";

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Dashboard</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 10%", minHeight: "100vh" }}>
        <div className="site-layout-content">
          <Dashboard />
        </div>
      </Content>
    </Layout>
  );
};

export default App;
