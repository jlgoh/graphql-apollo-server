import React, { Fragment } from "react";
import { Table, Tag, Space, Button } from "antd";
import { gql, useQuery } from "@apollo/client";
import CheckInOutDialog from "./CheckInOutDialog";
import { dialogOpenVar } from "../cache";

// Fetch remote data
const GET_TODAY_ATTENDANCE = gql`
  query todayAttendance {
    todayAttendance {
      id
      name
      role
      dept
      attendance {
        checkInDate
        checkOutDate
      }
    }
  }
`;

const EmployeeList = () => {
  const { loading, error, data } = useQuery(GET_TODAY_ATTENDANCE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    data &&
    data.todayAttendance && (
      <Fragment>
        <Table
          columns={columns}
          dataSource={data.todayAttendance.map((employee) => ({
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
    dataIndex: "attendance",
    key: "attendance",
    render: (attendance) => {
      return (
        <Space size="middle">
          <Button
            style={{ minWidth: 113 }}
            disabled={attendance.length && attendance[0].checkOutDate}
            onClick={() => dialogOpenVar(true)}
            shape="round"
            type="primary"
            danger={attendance.length && !attendance[0].checkOutDate}
          >
            {!attendance.length
              ? "Check In"
              : attendance[0].checkOutDate
              ? "Checked Out"
              : "Check Out"}
          </Button>
        </Space>
      );
    },
  },
];

export default EmployeeList;
