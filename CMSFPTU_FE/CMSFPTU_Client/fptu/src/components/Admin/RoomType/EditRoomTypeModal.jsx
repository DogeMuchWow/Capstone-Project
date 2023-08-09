import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { Button, Modal, message, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const EditRoomTypeModal = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const [typeCode, setTypeCode] = useState("");
  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    form.setFieldsValue({
      typeCode: props?.data?.typeCode,
      typeName: props?.data?.typeName,
      description: props?.data?.description,
    });

    setTypeCode(props?.data?.typeCode);
    setTypeName(props?.data?.typeName);
    setDescription(props?.data?.description);
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
    setTypeCode("");
    setTypeName("");
    setDescription("");
    setModalOpen(false);
    form.resetFields();
  };

  const handleEditOk = async (e) => {
    try {
      const response = await axios.put(
        props?.url,
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
      message.error("Room type edit fail!");
      console.log(error);
      setTypeCode("");
      setTypeName("");
      setDescription("");
      dispatch(
        reloading({
          reloading: false,
        })
      );
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
        title="Edit Room Type"
        open={isModalOpen}
        onOk={handleEditOk}
        onCancel={handleCancel}
        closable
        footer={[]}
      >
        <Form onFinish={handleEditOk} layout="vertical" form={form}>
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
              <Input onChange={(e) => setTypeCode(e.target.value)}></Input>
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
              <Input onChange={(e) => setTypeName(e.target.value)}></Input>
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
              <Input onChange={(e) => setDescription(e.target.value)}></Input>
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

export default EditRoomTypeModal;
