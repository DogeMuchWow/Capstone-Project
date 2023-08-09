import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { message, AutoComplete, DatePicker, Select, Form } from "antd";
import { subDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TeacherAddNewRequest = (props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const formData = new FormData();
  const accountId = useSelector((state) => state.user.accountID);

  const [requestTypeInput, setRequestTypeInput] = useState("");
  const [requestTypeSelected, setRequestTypeSelected] = useState("");
  const [requestTypeData, setRequestTypeData] = useState([]);

  const [classInput, setClassInput] = useState("");
  const [classSelected, setClassSelected] = useState("");
  const [classData, setClassData] = useState([]);

  const [subjectInput, setSubjectInput] = useState("");
  const [subjectSelected, setSubjectSelected] = useState("");
  const [subjectData, setSubjectData] = useState([]);

  const [slotSelected, setSlotSelected] = useState("");

  const [roomInput, setRoomInput] = useState("");
  const [roomSelected, setRoomSelected] = useState("");
  const [roomData, setRoomData] = useState([]);

  const [date, setDate] = useState("");

  //request type
  useEffect(() => {
    async function getAllRequestType() {
      try {
        const response = await axios.get("/RequestTeacher/get-request-type");
        setRequestTypeData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllRequestType();
  }, []);
  const handleRequestTypeChange = (data, option) => {
    setRequestTypeInput(data);
    setRequestTypeSelected(option);
  };
  const handleRequestTypeSelect = (data, option) => {
    form.setFieldsValue({ requestType: option?.label });
    setRequestTypeInput(option.label);
    setRequestTypeSelected(option);
  };
  const requestTypeOptions = requestTypeData.map(function (row) {
    return { value: row?.requestTypeId, label: row?.requestName };
  });

  //date
  const disabledDate = (current) => {
    return current.isSameOrBefore(subDays(new Date(), 1));
  };

  const onDateSelected = (date, dateString) => {
    setDate(dateString);
  };

  //class
  useEffect(() => {
    async function getAllClass() {
      try {
        const response = await axios.get(
          "/RequestTeacher/get-class?accountId=" + accountId
        );
        setClassData(response.data);
      } catch (error) {
        message.error("Can not get class");
      }
    }
    getAllClass();
  }, []);
  const handleClassChange = (data, option) => {
    setClassInput(data);
    setClassSelected(option);
  };
  const handleClassSelect = (data, option) => {
    form.setFieldsValue({ class: option?.label });
    setClassInput(option.label);
    setClassSelected(option);
  };
  const classOptions = classData.map(function (row) {
    return { value: row?.classId, label: row?.classCode };
  });

  //subject
  useEffect(() => {
    async function getAllSubject() {
      try {
        const response = await axios.get(
          "/RequestTeacher/get-subject?classId=" + classSelected.value
        );
        setSubjectData(response.data);
        subjectData.map(function (row) {});
      } catch (error) {}
    }
    getAllSubject();
  }, [classSelected]);

  const handleSubjectChange = (data, option) => {
    setSubjectInput(data);
    setSubjectSelected(option);
  };
  const handleSubjectSelect = (data, option) => {
    form.setFieldsValue({ subject: option?.label });
    setSubjectInput(option.label);
    setSubjectSelected(option);
  };
  const subjectOptions = subjectData.map(function (row) {
    return { value: row?.subject?.subjectId, label: row?.subject?.subjectCode };
  });

  //slot
  const handleSlotSelected = (value) => {
    setSlotSelected(value);
  };

  //room
  useEffect(() => {
    async function getAllRoom() {
      try {
        const response = await axios.get(
          "/RequestTeacher/get-room?slotId=" +
            slotSelected +
            "&requestDate=" +
            date
        );
        setRoomData(response.data);
      } catch (error) {
        setRoomData([]);
      }
    }
    getAllRoom();
  }, [slotSelected, date]);
  const handleRoomChange = (data, option) => {
    setRoomInput(data);
    setRoomSelected(option);
  };
  const handleRoomSelect = (data, option) => {
    form.setFieldsValue({ room: option?.label });
    setRoomInput(option.label);
    setRoomSelected(option);
  };
  const roomOptions = roomData.map(function (row) {
    return { value: row?.roomId, label: row?.roomNumber };
  });

  const handleSubmit = async (e) => {
    formData.append("RequestTypeId", requestTypeSelected.value);
    formData.append("RequestDate", date);
    formData.append("SubjectId", subjectSelected.value);
    formData.append("RoomId", roomSelected.value);
    formData.append("ClassId", classSelected.value);
    formData.append("SlotId", slotSelected);
    formData.append("AccountId", props.accountId);
    try {
      const response = await axios.post(props?.url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response?.data?.status === true) {
        message.success(response?.data?.message);
      } else {
        message.error(response?.data?.message);
      }
      setRequestTypeInput("");
      setRequestTypeSelected("");
      setClassInput("");
      setClassSelected("");
      setSubjectInput("");
      setSubjectSelected("");
      setSlotSelected("");
      setRoomInput("");
      setRoomSelected("");
      setDate("");
      navigate("/teacher/request");
      form.resetFields();
    } catch (error) {
      form.resetFields();
      message.error("Add fail!");
      console.log(error);
      setRequestTypeInput("");
      setRequestTypeSelected("");
      setClassInput("");
      setClassSelected("");
      setSubjectInput("");
      setSubjectSelected("");
      setSlotSelected("");
      setRoomInput("");
      setRoomSelected("");
      setDate("");
    }
  };

  return (
    <div>
      <>
        <Form onFinish={handleSubmit} layout="vertical" form={form}>
          <div className="mb-3">
            <Form.Item
              name="requestType"
              label="Request Type"
              rules={[
                { required: true, message: "Please enter request type" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("requestType") ===
                        requestTypeSelected?.label
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("This request type does not exist")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <AutoComplete
                defaultActiveFirstOption
                placeholder="Request type"
                style={{
                  width: "100%",
                }}
                filterOption={(requestTypeInput, option) =>
                  option.label
                    .toUpperCase()
                    .indexOf(requestTypeInput.toUpperCase()) !== -1
                }
                onChange={handleRequestTypeChange}
                onSelect={handleRequestTypeSelect}
                options={requestTypeOptions}
              ></AutoComplete>
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
                style={{
                  width: "100%",
                }}
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
                onChange={onDateSelected}
              />
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              name="class"
              label="Class"
              rules={[
                { required: true, message: "Please enter class" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("class") === classSelected?.label
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("This class does not exist")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <AutoComplete
                defaultActiveFirstOption
                placeholder="Class Code"
                style={{
                  width: "100%",
                }}
                filterOption={(classInput, option) =>
                  option.label
                    .toUpperCase()
                    .indexOf(classInput.toUpperCase()) !== -1
                }
                onChange={handleClassChange}
                onSelect={handleClassSelect}
                options={classOptions}
              ></AutoComplete>
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              name="subject"
              label="Subject"
              rules={[
                { required: true, message: "Please enter subject" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("subject") === subjectSelected?.label
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("This subject does not exist")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <AutoComplete
                defaultActiveFirstOption
                placeholder="Subject Code"
                style={{
                  width: "100%",
                }}
                filterOption={(subjectInput, option) =>
                  option.label
                    .toUpperCase()
                    .indexOf(subjectInput.toUpperCase()) !== -1
                }
                onChange={handleSubjectChange}
                onSelect={handleSubjectSelect}
                options={subjectOptions}
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
                placeholder="Please select a slot"
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
          <div className="col text-right">
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </>
    </div>
  );
};

export default TeacherAddNewRequest;
