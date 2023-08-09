import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { Button, Modal, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const ViewAccountData = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [accountData, setAccountData] = useState("");

  useEffect(() => {
    handleView();
  }, []);

  function getFormattedDate(date) {
    const d = new Date(date);
    var year = d.getFullYear();
    var month = (1 + d.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;
    var day = d.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return day + "/" + month + "/" + year;
  }

  function translateStatusMeaning(status) {
    if (status === 1) {
      return (status = "Active");
    } else {
      return (status = "Deleted");
    }
  }

  function translateGenderMeaning(gender) {
    if (gender === true) {
      return (gender = "Male");
    } else {
      return (gender = "Female");
    }
  }

  const showViewModal = async () => {
    await handleView();
    setModalOpen(true);
  };
  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleView = async (e) => {
    try {
      const response = await axios.get(props?.url);
      setAccountData(response);
    } catch (error) {
      message.error("View account detail fail");
      console.log(error);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        className="mr-2"
        onClick={() => {
          showViewModal();
        }}
      >
        <EyeOutlined />
      </Button>

      <Modal
        title="Detail Account"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <h5>Account Code: {accountData?.data?.body?.accountCode}</h5>
        <h5>First Name: {accountData?.data?.body?.firstname}</h5>
        <h5>Last Name: {accountData?.data?.body?.lastname}</h5>
        <h5>
          Gender: {translateGenderMeaning(accountData?.data?.body?.gender)}
        </h5>
        <h5>Email: {accountData?.data?.body?.email}</h5>
        <h5>Class: {accountData?.data?.body?.class?.classCode}</h5>
        <h5>Phone: {accountData?.data?.body?.phone}</h5>
        <h5>Role: {accountData?.data?.body?.role?.roleName}</h5>
        <h5>
          Create at: {getFormattedDate(accountData?.data?.body?.createdAt)}
        </h5>
        <h5>
          Status:{" "}
          {translateStatusMeaning(accountData?.data?.body?.systemStatusId)}
        </h5>
      </Modal>
    </div>
  );
};

export default ViewAccountData;
