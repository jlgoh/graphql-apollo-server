import React, { useState } from "react";
import { Modal, Typography } from "antd";
import { useQuery, gql } from "@apollo/client";
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

const CheckInOutDialog = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dialog = useQuery(GET_DIALOG_STATE);
  const selected = useQuery(GET_SELECTED);

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setConfirmLoading(false);
      dialogOpenVar(false);
    }, 2000);
  };

  const handleCancel = () => {
    dialogOpenVar(false);
  };

  return (
    <Modal
      title="Check In"
      visible={dialog.data.dialogOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Typography.Title level={5}>
        {selected.data.selectedCheckInOut.name}
      </Typography.Title>
      Current Date & Time: {new Date().toLocaleString()}
    </Modal>
  );
};

export default CheckInOutDialog;
