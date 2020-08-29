import React, { useState } from "react";
import { Modal, Typography, Form, Input } from "antd";
import { useQuery, gql, useMutation } from "@apollo/client";
import { dialogOpenVar } from "../cache";

// Fetch local state
const GET_DIALOG_STATE = gql`
  query GetDialogState {
    dialogOpen @client
  }
`;

const GET_SELECTED = gql`
  query GetSelectedEmployee {
    selectedCheckInOut @client
  }
`;

// Mutate remote state
const CHECK_IN = gql`
  mutation CheckInEmployee($id: ID!, $checkInTemp: Float!, $task: String!) {
    checkInEmployee(
      id: $id
      dailyRecord: { checkInTemp: $checkInTemp, task: $task }
    ) {
      success
      message
      employee {
        id
        name
        attendance {
          task
          checkInDate
          checkInTemp
        }
      }
    }
  }
`;

const CHECK_OUT = gql`
  mutation CheckOutEmployee(
    $id: ID!
    $checkOutTemp: Float!
    $statusUpdate: String!
  ) {
    checkOutEmployee(
      id: $id
      dailyRecord: { checkOutTemp: $checkOutTemp, statusUpdate: $statusUpdate }
    ) {
      success
      message
      employee {
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
  }
`;

const CheckInOutDialog = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const dialog = useQuery(GET_DIALOG_STATE);
  const selected = useQuery(GET_SELECTED);
  const [checkIn] = useMutation(CHECK_IN);
  const [checkOut] = useMutation(CHECK_OUT);

  const handleOk = async () => {
    setConfirmLoading(true);
    form.submit();
    try {
      if (selected.data.selectedCheckInOut.action === "Check In") {
        await checkIn({
          variables: {
            id: selected.data.selectedCheckInOut.id,
            checkInTemp: parseFloat(form.getFieldsValue().checkInTemp),
            task: form.getFieldsValue().task,
          },
        });
      } else {
        await checkOut({
          variables: {
            id: selected.data.selectedCheckInOut.id,
            checkOutTemp: parseFloat(form.getFieldsValue().checkOutTemp),
            statusUpdate: form.getFieldsValue().statusUpdate,
          },
        });
      }
      setConfirmLoading(false);
      dialogOpenVar(false);
    } catch (err) {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    dialogOpenVar(false);
  };

  const renderForm = (action) => {
    return (
      <Form layout={"vertical"} form={form} style={{ marginTop: 10 }}>
        <Form.Item
          name={action === "Check In" ? "checkInTemp" : "checkOutTemp"}
          label={<b>Temperature</b>}
          rules={[{ required: true, message: "Please input your temperature" }]}
        >
          <Input
            placeholder="Temperature"
            type="number"
            min={35}
            max={40}
            step={0.1}
          />
        </Form.Item>
        <Form.Item
          name={action === "Check In" ? "task" : "statusUpdate"}
          label={
            <b>
              {action === "Check In"
                ? "Today's Task"
                : "Status Update at End of the Day"}
            </b>
          }
          rules={[
            {
              required: true,
              message:
                action === "Check In"
                  ? "Please enter your task today."
                  : "Please update the status of your task today.",
            },
          ]}
        >
          <Input.TextArea
            row={4}
            placeholder={
              action === "Check In"
                ? "What are you doing today?"
                : "Update status for today's task"
            }
          />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={selected.data.selectedCheckInOut.action}
      visible={dialog.data.dialogOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Typography.Title level={5}>
        {selected.data.selectedCheckInOut.name}
      </Typography.Title>
      Current Date & Time: {new Date().toLocaleString()}
      {renderForm(selected.data.selectedCheckInOut.action)}
    </Modal>
  );
};

export default CheckInOutDialog;
