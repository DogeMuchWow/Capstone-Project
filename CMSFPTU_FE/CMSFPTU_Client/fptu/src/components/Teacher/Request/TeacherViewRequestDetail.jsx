import axios from "../../../api/axios";
import { useState } from "react";
import { Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const TeacherViewRequestDetail = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [requestData, setRequestData] = useState("");

  function translateStatusMeaning(status) {
    if (status === 1) {
      return (status = "Active");
    } else if (status === 2) {
      return (status = "Deleted");
    } else if (status === 3) {
      return (status = "Pending");
    } else if (status === 4) {
      return (status = "Approved");
    } else if (status === 5) {
      return (status = "Rejected");
    } else {
      return (status = "No status");
    }
  }

  const showViewModal = () => {
    handleView();
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
      setRequestData(response);
      console.log(response);
    } catch (error) {
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
        title="Detail Request"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
        closable
      >
        <h5>Class: {requestData?.data?.body?.class.classCode}</h5>
        <h5>Room: {requestData?.data?.body?.room.roomNumber}</h5>
        <h5>Subject: {requestData?.data?.body?.subject.subjectCode}</h5>
        <h5>Slot: {requestData?.data?.body?.slot.slotId}</h5>
        <h5>
          Status:{" "}
          {translateStatusMeaning(requestData?.data?.body?.systemStatusId)}
        </h5>
      </Modal>
    </div>
  );
};

export default TeacherViewRequestDetail;
