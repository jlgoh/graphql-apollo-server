import React, { useState } from "react";
import { Modal } from "antd";
import { useQuery, gql } from "@apollo/client";
import { dialogOpenVar } from "../cache";

// Fetch local state
const GET_DIALOG_STATE = gql`
  query GetDialogState {
    dialogOpen @client
  }
`;

const CheckInOutDialog = () => {
  const { data } = useQuery(GET_DIALOG_STATE);
  const [confirmLoading, setConfirmLoading] = useState(false);

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

  console.log("render", dialogOpenVar());
  return (
    <Modal
      title="Check In"
      visible={data.dialogOpen}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      Check In
    </Modal>
  );
};

export default CheckInOutDialog;
