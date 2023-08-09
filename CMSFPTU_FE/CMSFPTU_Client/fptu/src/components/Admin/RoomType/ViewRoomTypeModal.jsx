import axios from "../../../api/axios";
import { useState } from "react";
import { Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const ViewRoomTypeModal = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [RoomTypeData, setRoomTypeData] = useState("");

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
      setRoomTypeData(response);
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
        title="View Room Type"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}>
        <h5>Code: {RoomTypeData?.data?.body?.typeCode}</h5>
        <h5>Name: {RoomTypeData?.data?.body?.typeName}</h5>
        <h5>Description: {RoomTypeData?.data?.body?.description}</h5>
        <h5>Status:{" "}{translateStatusMeaning(RoomTypeData?.data?.body?.systemStatusId)}</h5>
      </Modal>
    </div>
  );
};

export default ViewRoomTypeModal;
