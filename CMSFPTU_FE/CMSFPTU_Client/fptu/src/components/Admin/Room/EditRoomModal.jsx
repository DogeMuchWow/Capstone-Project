import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { Button, Modal, message, AutoComplete, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const EditRoomModal = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomTypeId, setRoomTypeId] = useState("");

  const [roomTypeInput, setRoomTypeInput] = useState("");
  const [roomTypeSelected, setRoomTypeSelected] = useState("");
  const [roomTypeData, setRoomTypeData] = useState([]);

  useEffect(() => {
    const currentRoomType = {
      label: props?.data?.type?.typeCode,
      value: props?.data?.type?.typeId,
    };
    form.setFieldsValue({
      roomNumber: props?.data?.roomNumber,
      roomTypeLabel: props?.data?.type?.typeCode,
    });
    setRoomNumber(props?.data?.roomNumber);
    setRoomTypeSelected(currentRoomType);
  }, [props, isModalOpen]);

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
    setRoomTypeInput(data);
    setRoomTypeSelected(option);
  };
  const handleRoomTypeSelect = (data, option) => {
    form.setFieldsValue({ roomTypeLabel: option.label });
    setRoomTypeInput(option.label);
    setRoomTypeSelected(option);
  };
  const roomTypeOptions = roomTypeData.map(function (row) {
    return { value: row.typeId, label: row.typeCode };
  });

  const showEditModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    dispatch(
      reloading({
        reloading: false,
      })
    );
    setRoomTypeInput("");
    setRoomTypeSelected("");
    setModalOpen(false);
    form.resetFields();
  };

  const handleEditOk = async (e) => {
    try {
      const response = await axios.put(
        props.url,
        {
          roomNumber: roomNumber,
          typeId: roomTypeSelected.value,
        },
        {
          header: { "content-type": "application/json" },
        }
      );
      setRoomTypeInput("");
      setRoomTypeSelected("");
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
      form.resetFields();
      message.error("Room edit fail");
      console.log(error);
      setRoomNumber("");
      setRoomTypeId("");
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
        title="Edit Room"
        open={isModalOpen}
        onOk={handleEditOk}
        onCancel={handleCancel}
        closable
        footer={[]}
      >
        <Form onFinish={handleEditOk} layout="vertical" form={form}>
          <div className="mb-3">
            <Form.Item
              name="roomNumber"
              label="Room number"
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
              label="Room type"
              rules={[
                { required: true, message: "Please enter room number" },
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

export default EditRoomModal;
