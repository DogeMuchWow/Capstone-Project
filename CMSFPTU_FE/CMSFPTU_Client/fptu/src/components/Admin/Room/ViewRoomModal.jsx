import axios from "../../../api/axios";
import { useState } from "react";
import { Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const ViewRoomModal = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [RoomData, setRoomData] = useState("");

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
      setRoomData(response);
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
        title="View Room"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
        closable
      >
        <h5>Room Number: {RoomData?.data?.body?.roomNumber}</h5>
        <h5>Type Code: {RoomData?.data?.body?.type.typeCode}</h5>
        <h5>Type Name: {RoomData?.data?.body?.type.typeName}</h5>
        <h5>
          Status: {translateStatusMeaning(RoomData?.data?.body?.systemStatusId)}
        </h5>
      </Modal>
    </div>
  );
};

export default ViewRoomModal;
