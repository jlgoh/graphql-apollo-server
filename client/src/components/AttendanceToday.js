import React, { Fragment } from "react";
import { Divider, List, Avatar } from "antd";
import { gql, useQuery } from "@apollo/client";

import { Collapse } from "antd";

const { Panel } = Collapse;

// Fetch remote data
const GET_TODAY_ATTENDANCE = gql`
  query todayAttendance {
    todayAttendance {
      id
      name
      attendance {
        task
        checkInDate
        checkInTemp
        statusUpdate
        checkOutDate
        checkOutTemp
      }
    }
  }
`;

const AttendanceToday = () => {
  const { loading, error, data } = useQuery(GET_TODAY_ATTENDANCE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const checkedIn = [];
  const checkedOut = [];
  const notCheckedIn = [];

  //Get Today Attendees.
  data.todayAttendance.forEach((employee) => {
    if (!employee.attendance.length) {
      notCheckedIn.push(employee);
    } else {
      if (
        employee.attendance[0].checkInDate &&
        !employee.attendance[0].checkOutDate
      ) {
        checkedIn.push(employee);
      } else if (
        employee.attendance[0].checkInDate &&
        employee.attendance[0].checkOutDate
      ) {
        checkedOut.push(employee);
      }
    }
  });

  return (
    <Fragment>
      <Divider orientation="left">Checked In</Divider>
      <List
        itemLayout="horizontal"
        dataSource={checkedIn}
        renderItem={({ name, attendance }) => (
          <Fragment>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{name}</a>}
                description={"Task Today: " + attendance[0].task}
              />
              <Collapse ghost>
                <Panel header="Check In Details" key="1">
                  <p>Date & Time Checked In: {attendance[0].checkInDate}</p>
                  <p>Temperature on Check In: {attendance[0].checkInTemp}°C</p>
                </Panel>
              </Collapse>
            </List.Item>
          </Fragment>
        )}
      />
      <Divider orientation="left">Checked Out</Divider>
      <List
        itemLayout="horizontal"
        dataSource={checkedOut}
        renderItem={({ name, attendance }) => (
          <Fragment>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{name}</a>}
                description={"Status Update: " + attendance[0].statusUpdate}
              />
              <Collapse ghost>
                <Panel header="Check Out Details" key="1">
                  <p>Date & Time Checked In: {attendance[0].checkInDate}</p>
                  <p>Temperature on Check In: {attendance[0].checkInTemp}°C</p>
                  <p>Task Today: {attendance[0].task}</p>
                  <p>Date & Time Checked Out: {attendance[0].checkOutDate}</p>
                  <p>
                    Temperature on Check Out: {attendance[0].checkOutTemp}°C
                  </p>
                </Panel>
              </Collapse>
            </List.Item>
          </Fragment>
        )}
      />
      <Divider orientation="left">Not Checked In Yet</Divider>
      <List
        itemLayout="horizontal"
        dataSource={notCheckedIn}
        renderItem={({ name }) => (
          <Fragment>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{name}</a>}
              />
            </List.Item>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default AttendanceToday;
