import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { Button, Modal, message, AutoComplete, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const AddNewRoomModal = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");

  const [roomTypeInput, setRoomTypeInput] = useState("");
  const [roomTypeSelected, setRoomTypeSelected] = useState("");
  const [roomTypeData, setRoomTypeData] = useState([]);

  //room type
  useEffect(() => {
    async function getAllRoomType() {
      try {
        const response = await axios.get("/RoomType");
        setRoomTypeData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllRoomType();
  }, []);
  const handleRoomTypeChange = (data, option) => {
    form.setFieldsValue({ roomTypeLabel: data });
    setRoomTypeInput(data);
    setRoomTypeSelected(option);
  };
  const handleRoomTypeSelect = (data, option) => {
    form.setFieldsValue({ roomTypeLabel: option.label });
    setRoomTypeInput(option.label);
    setRoomTypeSelected(option);
  };
  const roomTypeOptions = roomTypeData.map(function (row) {
    return { value: row?.typeId, label: row?.typeCode };
  });

  const showAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCancel = () => {
    setRoomTypeInput("");
    setRoomTypeSelected("");
    dispatch(
      reloading({
        reloading: false,
      })
    );
    setAddModalOpen(false);
    form.resetFields();
  };

  const handleAddOk = async (e) => {
    try {
      const response = await axios.post(
        props.url,
        {
          roomNumber: roomNumber,
          typeId: roomTypeSelected.value,
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
      setRoomTypeInput("");
      setRoomTypeSelected("");
      dispatch(
        reloading({
          reloading: true,
        })
      );
      form.resetFields();
    } catch (error) {
      form.resetFields();
      message.error("Add room fail!");
      console.log(error);
      dispatch(
        reloading({
          reloading: false,
        })
      );
      setRoomTypeInput("");
      setRoomTypeSelected("");
    }
    setAddModalOpen(false);
  };

  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <Button type="primary" onClick={showAddModal}>
          <PlusOutlined /> New Room
        </Button>
      </div>
      <Modal
        title="Add new room"
        open={isAddModalOpen}
        onCancel={handleCancel}
        closable
        footer={[]}
      >
        <Form onFinish={handleAddOk} form={form} layout="vertical">
          <div className="mb-3">
            <Form.Item
              name="roomNumber"
              label="Number"
              rules={[
                { required: true, message: "Please enter room number" },
                { whitespace: true },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Room Number"
                onChange={(e) => setRoomNumber(e.target.value)}
              ></Input>
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              name="roomTypeLabel"
              label="Room Type"
              rules={[
                { required: true, message: "Please enter room type" },
                { whitespace: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("roomTypeLabel") === roomTypeSelected?.label
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("This room type does not exist")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <AutoComplete
                defaultActiveFirstOption
                placeholder="Input room type"
                style={{
                  width: "100%",
                }}
                filterOption={(roomTypeInput, option) =>
                  option.label
                    .toUpperCase()
                    .indexOf(roomTypeInput.toUpperCase()) !== -1
                }
                onChange={handleRoomTypeChange}
                onSelect={handleRoomTypeSelect}
                options={roomTypeOptions}
              ></AutoComplete>
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

export default AddNewRoomModal;
