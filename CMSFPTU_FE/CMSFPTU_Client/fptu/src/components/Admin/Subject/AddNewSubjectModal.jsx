import axios from "../../../api/axios";
import { useState } from "react";
import { Button, Modal, message, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const AddNewSubjectModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const SUBJECT_CREATE_URL = "/Subject/create";
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const showAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(
      reloading({
        reloading: false,
      })
    );
    setAddModalOpen(false);
  };

  const handleAddOk = async (e) => {
    try {
      const response = await axios.post(
        SUBJECT_CREATE_URL,
        {
          subjectCode: subjectCode,
          subjectName: subjectName,
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
      setSubjectCode("");
      setSubjectName("");
      dispatch(
        reloading({
          reloading: true,
        })
      );
      form.resetFields();
    } catch (error) {
      message.error("Add new subject fail!");
      console.log(error);
      dispatch(
        reloading({
          reloading: false,
        })
      );
      setSubjectCode("");
      setSubjectName("");
      form.resetFields();
    }
    setAddModalOpen(false);
  };
  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <Button type="primary" onClick={showAddModal}>
          <PlusOutlined /> New subject
        </Button>
      </div>
      <Modal
        title="Add Subject"
        open={isAddModalOpen}
        onCancel={handleCancel}
        closable
        footer={[]}
      >
        <Form onFinish={handleAddOk} layout="vertical" form={form}>
          <div className="mb-3">
            <Form.Item
              name="subjectCode"
              label="Subject Code"
              rules={[
                { required: true, message: "Please enter subject code" },
                { whitespace: true },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Subject Code"
                onChange={(e) => setSubjectCode(e.target.value)}
              ></Input>
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              name="subjectName"
              label="Subject Name"
              rules={[
                { required: true, message: "Please enter subject name" },
                { whitespace: true },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Subject Name"
                onChange={(e) => setSubjectName(e.target.value)}
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

export default AddNewSubjectModal;
