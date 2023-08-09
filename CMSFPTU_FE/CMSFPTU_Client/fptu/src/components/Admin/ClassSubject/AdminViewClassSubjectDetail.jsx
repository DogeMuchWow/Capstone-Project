import axios from "../../../api/axios";
import { useState } from "react";
import { Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const AdminViewClassSubjectDetail = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [SubjectData, setSubjectData] = useState("");

  function translateStatusMeaning(status) {
    if (status === 1) {
      return (status = "Active");
    } else {
      return (status = "Deleted");
    }
  }

  function getFormattedDate(date) {
    if (date != null) {
      const d = new Date(date);
      var year = d.getFullYear();
      var month = (1 + d.getMonth()).toString();
      month = month.length > 1 ? month : "0" + month;
      var day = d.getDate().toString();
      day = day.length > 1 ? day : "0" + day;
      return day + "/" + month + "/" + year;
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
        title="View Account Subject Detail"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <h5>Class: {SubjectData?.data?.body?.classCode}</h5>
        <h5>Subject: {SubjectData?.data?.body?.subject?.subjectCode}</h5>
        <h5>
          Start Date: {getFormattedDate(SubjectData?.data?.body?.startDate)}
        </h5>
        <h5>End Date: {getFormattedDate(SubjectData?.data?.body?.endDate)}</h5>
        <h5>
          Status:{" "}
          {translateStatusMeaning(SubjectData?.data?.body?.systemStatusId)}
        </h5>
      </Modal>
    </div>
  );
};

export default AdminViewClassSubjectDetail;
