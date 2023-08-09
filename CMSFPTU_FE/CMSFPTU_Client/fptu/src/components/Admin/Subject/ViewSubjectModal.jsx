import axios from "../../../api/axios";
import { useState } from "react";
import { Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const ViewSubjectModal = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [SubjectData, setSubjectData] = useState("");

  function translateStatusMeaning(status) {
    if (status === 1) {
      return (status = "Active");
    } else {
      return (status = "Deleted");
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
      setSubjectData(response);
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
        title="View Subject"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <h5>Subject code: {SubjectData?.data?.body?.subjectCode}</h5>
        <h5>Subject name: {SubjectData?.data?.body?.subjectName}</h5>
        <h5>
          Status:{" "}
          {translateStatusMeaning(SubjectData?.data?.body?.systemStatusId)}
        </h5>
      </Modal>
    </div>
  );
};

export default ViewSubjectModal;
