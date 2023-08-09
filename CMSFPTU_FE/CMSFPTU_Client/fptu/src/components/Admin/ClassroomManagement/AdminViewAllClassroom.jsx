import axios from "../../../api/axios";
import { useState } from "react";
import { Table, message, Select, Form, DatePicker, Button, Tag } from "antd";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const AdminViewAllClassroom = () => {
  const [form] = Form.useForm();
  const [date, setDate] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [slotId, setSlotId] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const VIEW_CLASSROOM =
    "/ClassroomManagement?date=" +
    date +
    "&status=" +
    roomStatus +
    "&slotId=" +
    slotId;

  function translateStatusMeaning(status) {
    if (status === true) {
      return (status = "Available");
    } else {
      return (status = "Unavailable");
    }
  }

  function colourMeaning(status) {
    let colour = "";
    if (status === true) {
      return (colour = "green");
    } else {
      return (colour = "red");
    }
  }

  const columns = [
    {
      title: "Room number",
      dataIndex: "roomNumber",
      key: "roomNumber",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Room type",
      dataIndex: ["roomType", "typeName"],
      key: "typeCode",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: () => (
        <div>
          <Tag color={colourMeaning(currentStatus)}>
            {translateStatusMeaning(currentStatus)}
          </Tag>
        </div>
      ),
    },
  ];
  //slot
  const handleSlotSelected = (value) => {
    setSlotId(value);
  };
  const handleSubmit = async (e) => {
    try {
      const response = await axios.get(VIEW_CLASSROOM, {
        header: { "content-type": "application/json" },
      });
      setDataTable(response?.data);
      setCount(response?.data?.length);
      message.success("Get classroom data successful!");
      dispatch(
        reloading({
          reloading: true,
        })
      );
      setCurrentStatus(roomStatus);
    } catch (error) {
      setCurrentStatus("");
      message.error("Get classroom data fail!");
      console.log(error);
      dispatch(
        reloading({
          reloading: false,
        })
      );
    }
  };
  return (
    <div>
      <Form layout="inline" onFinish={handleSubmit} form={form}>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            { required: true, message: "Please select classroom status" },
          ]}
          hasFeedback
        >
          <Select
            placeholder="Select status"
            onSelect={(e) => {
              setRoomStatus(e);
            }}
          >
            <Select.Option value={true}>Available</Select.Option>
            <Select.Option value={false}>Not Available</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "Please select date" }]}
          hasFeedback
        >
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(e) => {
              setDate(encodeURIComponent(e.format("YYYY/MM/DD")));
            }}
          ></DatePicker>
        </Form.Item>
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
        <div className="btn-group">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
      <br></br>
      <Table
        columns={columns}
        dataSource={dataTable}
        bordered
        footer={() => (
          <b>{<p className="text-right">TOTAL RECORD: {count}</p>}</b>
        )}
      />
    </div>
  );
};

export default AdminViewAllClassroom;
