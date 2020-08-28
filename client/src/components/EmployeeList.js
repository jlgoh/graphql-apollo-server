import React, { Fragment } from "react";
import { Table, Tag, Space, Button } from "antd";
import { gql, useQuery } from "@apollo/client";
import CheckInOutDialog from "./CheckInOutDialog";
import { dialogOpenVar } from "../cache";

// Fetch remote data
const GET_EMPLOYEES = gql`
  query employees {
    employees {
      id
      name
      role
      dept
    }
  }
`;

const EmployeeList = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    data &&
    data.employees && (
      <Fragment>
        <Table
          columns={columns}
          dataSource={data.employees.map((employee) => ({
            ...employee,
            key: employee.id,
          }))}
        />
        <CheckInOutDialog />
      </Fragment>
    )
  );
};

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Department",
    key: "dept",
    dataIndex: "dept",
    render: (dept) => (
      <>
        <Tag
          color={
            dept === "Technology"
              ? "geekblue"
              : dept === "Operations"
              ? "green"
              : "volcano"
          }
          key={dept}
        >
          {dept}
        </Tag>
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button onClick={() => dialogOpenVar(true)} type="primary">
          Check In
        </Button>
      </Space>
    ),
  },
];

export default EmployeeList;
