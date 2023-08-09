import axios from "../../../api/axios";
import { useState } from "react";
import { Button, Modal, message, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const AddNewClass = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const SUBJECT_CREATE_URL = "/Class/create";
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [classCode, setClassCode] = useState("");

  const showAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCancel = () => {
    dispatch(
      reloading({
        reloading: false,
      })
    );
    form.resetFields();
    setAddModalOpen(false);
  };

  const handleAddOk = async (e) => {
    try {
      const response = await axios.post(
        SUBJECT_CREATE_URL,
        {
          classCode: classCode,
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
      setClassCode("");
      dispatch(
        reloading({
          reloading: true,
        })
      );
      form.resetFields();
    } catch (error) {
      dispatch(
        reloading({
          reloading: false,
        })
      );
      setClassCode("");
      console.log(error);
      form.resetFields();
    }
    setAddModalOpen(false);
  };
  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <Button type="primary" onClick={showAddModal}>
          <PlusOutlined /> New class
        </Button>
      </div>
      <Modal
        title="Add Class"
        open={isAddModalOpen}
        onCancel={handleCancel}
        closable
        footer={[]}
      >
        <Form onFinish={handleAddOk} layout="vertical" form={form}>
          <div className="mb-3">
            <Form.Item
              name="classCode"
              label="Class Code"
              rules={[
                { required: true, message: "Please enter class code" },
                { whitespace: true },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Class Code"
                onChange={(e) => setClassCode(e.target.value)}
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

export default AddNewClass;
