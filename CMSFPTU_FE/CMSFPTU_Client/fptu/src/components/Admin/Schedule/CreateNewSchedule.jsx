import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { Button, Modal, message, AutoComplete, Select, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";
import DatePicker, { DateObject } from "react-multi-date-picker";

const CreateNewSchedule = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const [classSubjectInput, setClassSubjectInput] = useState("");
  const [classSubjectSelected, setClassSubjectSelected] = useState("");
  const [classSubjectData, setClassSubjectData] = useState([]);

  const [roomInput, setRoomInput] = useState("");
  const [roomSelected, setRoomSelected] = useState("");
  const [roomData, setRoomData] = useState([]);

  const [slotSelected, setSlotSelected] = useState("");

  const [scheduleDates, setScheduleDates] = useState([]);
  const [dates, setDates] = useState([]);

  const showAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCancel = () => {
    dispatch(
      reloading({
        reloading: false,
      })
    );
    setClassSubjectInput("");
    setClassSubjectSelected("");
    setRoomInput("");
    setRoomSelected("");
    setSlotSelected("");
    setDates([]);
    setScheduleDates([]);
    setAddModalOpen(false);
    form.resetFields();
  };

  //classSubject
  useEffect(() => {
    async function getAllClassSubject() {
      try {
        const response = await axios.get("/ClassSubject");
        setClassSubjectData(response.data);
      } catch (error) {
        message.error("Can not get class subject");
      }
    }
    getAllClassSubject();
  }, []);

  const handleClassSubjectChange = (data, option) => {
    setClassSubjectInput(data);
    setClassSubjectSelected(option);
  };
  const handleClassSubjectSelect = (data, option) => {
    form.setFieldsValue({ classSubject: option.label });
    setClassSubjectInput(option.label);
    setClassSubjectSelected(option);
  };
  const classSubjectOptions = classSubjectData.map(function (row) {
    return {
      value: row?.classSubjectId,
      label:
        "Class: " + row?.classCode + ", Subject: " + row?.subject?.subjectCode,
      startDate: row?.startDate,
      endDate: row?.endDate,
    };
  });

  //room
  useEffect(() => {
    async function getAllRoom() {
      try {
        const response = await axios.get("/Room");
        setRoomData(response.data);
      } catch (error) {
        setRoomData([]);
      }
    }
    getAllRoom();
  }, []);
  const handleRoomChange = (data, option) => {
    setRoomInput(data);
    setRoomSelected(option);
  };
  const handleRoomSelect = (data, option) => {
    form.setFieldsValue({ room: option.label });
    setRoomInput(option.label);
    setRoomSelected(option);
  };
  const roomOptions = roomData.map(function (row) {
    return { value: row.roomId, label: row.roomNumber };
  });

  //slot
  const handleSlotSelected = (value) => {
    setSlotSelected(value);
  };

  const handleAddOk = async (e) => {
    try {
      const response = await axios.post(
        "/Schedule",
        {
          classSubjectId: classSubjectSelected.value,
          roomId: roomSelected.value,
          slotId: slotSelected,
          scheduleDates: scheduleDates,
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
      setClassSubjectInput("");
      setClassSubjectSelected("");
      setRoomInput("");
      setRoomSelected("");
      setSlotSelected("");
      setDates([]);
      setScheduleDates([]);
      dispatch(
        reloading({
          reloading: true,
        })
      );
      form.resetFields();
    } catch (error) {
      form.resetFields();
      message.error("Add schedule fail!");
      console.log(error);
      dispatch(
        reloading({
          reloading: false,
        })
      );
      setClassSubjectInput("");
      setClassSubjectSelected("");
      setRoomInput("");
      setRoomSelected("");
      setSlotSelected("");
      setDates([]);
      setScheduleDates([]);
    }
    setAddModalOpen(false);
  };

  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <Button type="primary" onClick={showAddModal}>
          <PlusOutlined /> Create Schedule
        </Button>
      </div>
      <Modal
        title="Create schedule"
        open={isAddModalOpen}
        onCancel={handleCancel}
        closable
        footer={[]}
      >
        <Form onFinish={handleAddOk} layout="vertical" form={form}>
          <div className="mb-3">
            <Form.Item
              name="classSubject"
              label="Class Subject"
              rules={[
                { required: true, message: "Please select class subject" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("classSubject") ===
                        classSubjectSelected?.label
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("This class and subject does not exist")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <AutoComplete
                defaultActiveFirstOption
                placeholder="Class and Subject"
                style={{
                  width: "100%",
                }}
                filterOption={(classSubjectInput, option) =>
                  option.label
                    .toUpperCase()
                    .indexOf(classSubjectInput.toUpperCase()) !== -1
                }
                onChange={handleClassSubjectChange}
                onSelect={handleClassSubjectSelect}
                options={classSubjectOptions}
              ></AutoComplete>
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              name="room"
              label="Room"
              rules={[
                { required: true, message: "Please select room" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("room") === roomSelected?.label
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("This room does not exist")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <AutoComplete
                defaultActiveFirstOption
                placeholder="Room Code"
                style={{
                  width: "100%",
                }}
                filterOption={(roomInput, option) =>
                  option.label.toString().indexOf(roomInput) !== -1
                }
                onChange={handleRoomChange}
                onSelect={handleRoomSelect}
                options={roomOptions}
              ></AutoComplete>
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              name="slot"
              label="Slot"
              rules={[{ required: true, message: "Please select slot" }]}
              hasFeedback
            >
              <Select
                placeholder="Please select slot"
                style={{
                  width: "100%",
                }}
                onSelect={handleSlotSelected}
                value={slotSelected}
                options={[
                  {
                    value: "1",
                    label: "7:00-8:30",
                  },
                  {
                    value: "2",
                    label: "8:45-10:15",
                  },
                  {
                    value: "3",
                    label: "10:30-12:00",
                  },
                  {
                    value: "4",
                    label: "12:30-14:00",
                  },
                  {
                    value: "5",
                    label: "14:15-15:45",
                  },
                  {
                    value: "6",
                    label: "16:00-17:30",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: "Please select date" }]}
              hasFeedback
            >
              <DatePicker
                multiple
                minDate={classSubjectSelected?.startDate}
                maxDate={classSubjectSelected?.endDate}
                format="DD/MM/YYYY"
                onChange={(date) => {
                  const dateSplit = date.map(
                    (row) =>
                      row?.year + "-" + row?.month.number + "-" + row?.day
                  );
                  setScheduleDates(dateSplit);
                }}
                value={scheduleDates}
              />
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

export default CreateNewSchedule;
