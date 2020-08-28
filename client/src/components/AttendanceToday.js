import React, { Fragment } from "react";
import { Divider, List, Avatar } from "antd";
import { gql, useQuery } from "@apollo/client";

import { Collapse } from "antd";

const { Panel } = Collapse;

// Fetch remote data
const GET_ATTENDANCE = gql`
  query employees {
    employees {
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
  const { loading, error, data } = useQuery(GET_ATTENDANCE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const checkedIn = [];
  const checkedOut = [];
  const notCheckedIn = [];

  //Get Today Attendees.
  data.employees.forEach((employee) => {
    if (employee.attendance.length) {
      // TODO: Shift this filter logic elsewhere.
      let attendance = employee.attendance.filter(
        (record) =>
          new Date(record.checkInDate).toLocaleDateString() ===
          new Date().toLocaleDateString() //Today's date
      )[0];
      if (!attendance) {
        notCheckedIn.push({
          name: employee.name,
        });
      } else {
        let { checkInDate, checkInTemp, task } = attendance;
        if (!attendance.checkOutDate) {
          checkedIn.push({
            name: employee.name,
            checkInDate,
            checkInTemp,
            task,
          });
        } else {
          let { checkOutDate, checkOutTemp, statusUpdate } = attendance;
          checkedOut.push({
            name: employee.name,
            checkInDate,
            checkInTemp,
            task,
            checkOutDate,
            checkOutTemp,
            statusUpdate,
          });
        }
      }
    }
  });
  return (
    <Fragment>
      <Divider orientation="left">Checked In</Divider>
      <List
        itemLayout="horizontal"
        dataSource={checkedIn}
        renderItem={({ name, task, checkInDate, checkInTemp }) => (
          <Fragment>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{name}</a>}
                description={"Task Today: " + task}
              />
              <Collapse ghost>
                <Panel header="Check In Details" key="1">
                  <p>Date & Time Checked In: {checkInDate}</p>
                  <p>Temperature on Check In: {checkInTemp}°C</p>
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
        renderItem={({
          name,
          task,
          checkInDate,
          checkInTemp,
          checkOutDate,
          checkOutTemp,
          statusUpdate,
        }) => (
          <Fragment>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{name}</a>}
                description={"Status Update: " + statusUpdate}
              />
              <Collapse ghost>
                <Panel header="Check Out Details" key="1">
                  <p>Date & Time Checked In: {checkInDate}</p>
                  <p>Temperature on Check In: {checkInTemp}°C</p>
                  <p>Task Today: {task}</p>
                  <p>Date & Time Checked Out: {checkOutDate}</p>
                  <p>Temperature on Check Out: {checkOutTemp}°C</p>
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
