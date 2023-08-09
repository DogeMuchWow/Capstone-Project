import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { Button, Modal, message, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const EditClass = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const [classCode, setClassCode] = useState("");

  useEffect(() => {
    form.setFieldsValue({
      classCode: props?.data?.classCode,
    });
    setClassCode(props?.data?.classCode);
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
    setClassCode("");
    setModalOpen(false);
    form.resetFields();
  };

  const handleEditOk = async (e) => {
    try {
      const response = await axios.put(
        props?.url,
        {
          classCode: classCode,
        },
        {
          header: { "content-type": "application/json" },
        }
      );
      setClassCode("");
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
      message.error("Class edit fail!");
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
        title="Edit Class"
        open={isModalOpen}
        onOk={handleEditOk}
        onCancel={handleCancel}
        closable
        footer={[]}
      >
        <Form onFinish={handleEditOk} layout="vertical" form={form}>
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
              <Input onChange={(e) => setClassCode(e.target.value)}></Input>
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

export default EditClass;
