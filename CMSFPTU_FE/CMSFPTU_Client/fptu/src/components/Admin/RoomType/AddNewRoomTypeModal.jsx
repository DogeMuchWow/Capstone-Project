import axios from "../../../api/axios";
import { useState } from "react";
import { Button, Modal, message, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const AddNewRoomTypeModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const ROOMTYPE_CREATE_URL = "/RoomType/create";
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [typeCode, setTypeCode] = useState("");
  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");

  const showAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCancel = () => {
    dispatch(
      reloading({
        reloading: false,
      })
    );
    setTypeCode("");
    setTypeName("");
    setDescription("");
    setAddModalOpen(false);
    form.resetFields();
  };

  const handleAddOk = async (e) => {
    try {
      const response = await axios.post(
        ROOMTYPE_CREATE_URL,
        {
          typeCode: typeCode,
          typeName: typeName,
          description: description,
        },
        {
          header: { "content-type": "application/json" },
        }
      );
      if (response?.data?.status === true) {
        message.success(response?.data?.message);
      } else {
        message.error(response?.data?.message);
      }
      setTypeCode("");
      setTypeName("");
      setDescription("");
      dispatch(
        reloading({
          reloading: true,
        })
      );
      form.resetFields();
    } catch (error) {
      form.resetFields();
      message.error("Add room type fail");
      console.log(error);
      dispatch(
        reloading({
          reloading: false,
        })
      );
      setTypeCode("");
      setTypeName("");
      setDescription("");
    }
    setAddModalOpen(false);
  };
  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <Button type="primary" onClick={showAddModal}>
          <PlusOutlined /> New Room Type
        </Button>
      </div>
      <Modal
        title="Add new room type"
        open={isAddModalOpen}
        onCancel={handleCancel}
        closable
        footer={[]}
      >
        <Form onFinish={handleAddOk} layout="vertical" form={form}>
          <div className="mb-3">
            <Form.Item
              name="typeCode"
              label="Code"
              rules={[
                { required: true, message: "Please enter type code" },
                { whitespace: true },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Type Code"
                onChange={(e) => setTypeCode(e.target.value)}
              ></Input>
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              name="typeName"
              label="Name"
              rules={[
                { required: true, message: "Please enter type name" },
                { whitespace: true },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Type Name"
                onChange={(e) => setTypeName(e.target.value)}
              ></Input>
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter description" },
                { whitespace: true },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              ></Input>
            </Form.Item>
          </div>
          <div className="col text-right">
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewRoomTypeModal;
