import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { Button, Modal, message, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const EditSubjectModal = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    form.setFieldsValue({
      subjectCode: props?.data?.subjectCode,
      subjectName: props?.data?.subjectName,
    });
    setSubjectCode(props?.data?.subjectCode);
    setSubjectName(props?.data?.subjectName);
  }, [props, isModalOpen]);

  const showEditModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    dispatch(
      reloading({
        reloading: false,
      })
    );
    setSubjectCode("");
    setSubjectName("");
    setModalOpen(false);
    form.resetFields();
  };

  const handleEditOk = async (e) => {
    try {
      const response = await axios.put(
        props?.url,
        {
          subjectCode: subjectCode,
          subjectName: subjectName,
        },
        {
          header: { "content-type": "application/json" },
        }
      );
      setSubjectCode("");
      setSubjectName("");
      dispatch(
        reloading({
          reloading: true,
        })
      );
      if (response?.data?.status === true) {
        message.success(response?.data?.message);
      } else {
        message.error(response?.data?.message);
      }
      form.resetFields();
    } catch (error) {
      message.error("Subject edit fail!");
      console.log(error);
      dispatch(
        reloading({
          reloading: false,
        })
      );
      form.resetFields();
    }
    setModalOpen(false);
  };

  return (
    <div>
      <Button
        type="danger"
        className="mr-2"
        onClick={() => {
          showEditModal();
        }}
      >
        <EditOutlined />
      </Button>
      <Modal
        title="Edit Subject"
        open={isModalOpen}
        onOk={handleEditOk}
        onCancel={handleCancel}
        closable
        footer={[]}
      >
        <Form onFinish={handleEditOk} layout="vertical" form={form}>
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
              <Input onChange={(e) => setSubjectCode(e.target.value)}></Input>
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
              <Input onChange={(e) => setSubjectName(e.target.value)}></Input>
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

export default EditSubjectModal;
