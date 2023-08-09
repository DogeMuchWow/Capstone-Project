import axios from "../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Table, Input, message, Tag } from "antd";
import { reloading } from "../../../features/pageSlice";
import CreateNewSchedule from "./CreateNewSchedule";

const ViewAllSchedule = (props) => {
  const [dataTable, setDataTable] = useState([]);
  const dispatch = useDispatch();
  const pageReload = useSelector((state) => state.page.reloading);
  const [count, setCount] = useState(0);

  function getFormattedDate(date) {
    if (date != null) {
      const d = new Date(date);
      var year = d.getFullYear();
      var month = (1 + d.getMonth()).toString();
      month = month.length > 1 ? month : "0" + month;
      var day = d.getDate().toString();
      day = day.length > 1 ? day : "0" + day;
      return day + "/" + month + "/" + year;
    }
  }

  function statusMeaning(status) {
    if (status === 1) {
      return (status = "Active");
    } else if (status === 2) {
      return (status = "Deleted");
    } else if (status === 3) {
      return (status = "Pending");
    } else if (status === 4) {
      return (status = "Approved");
    } else if (status === 5) {
      return (status = "Rejected");
    } else {
      return (status = "No status");
    }
  }

  function colourMeaning(status) {
    let colour = "";
    if (status === 1) {
      return (colour = "blue");
    } else if (status === 2) {
      return (colour = "volcano");
    } else if (status === 3) {
      return (colour = "yellow");
    } else if (status === 4) {
      return (colour = "green");
    } else if (status === 5) {
      return (colour = "red");
    } else {
      return (colour = "gray");
    }
  }
  useEffect(() => {
    async function getSchedule() {
      const response = await axios.get(props?.url);
      setDataTable(response?.data);
      setCount(response?.data?.length);
      console.log(response);
      dispatch(
        reloading({
          reloading: false,
        })
      );
    }
    getSchedule();
  }, [pageReload, props]);

  const columns = [
    {
      title: "Class code",
      dataIndex: ["classSubject", "class", "classCode"],
      key: "roomNumber",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Subject code",
      dataIndex: ["classSubject", "subject", "subjectCode"],
      key: "roomNumber",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Room number",
      dataIndex: ["room", "roomNumber"],
      key: "roomNumber",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Slot",
      dataIndex: ["slot", "slotId"],
      key: "slotId",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Date",
      dataIndex: "endTime",
      key: "endTime",
      render: (text) => <div>{getFormattedDate(text)}</div>,
    },
    {
      title: "Status",
      dataIndex: "systemStatusId",
      key: "systemStatusId",
      render: (text) => (
        <div>
          <Tag color={colourMeaning(text)}>{statusMeaning(text)}</Tag>
        </div>
      ),
    },
  ];

  return (
    <div>
      <CreateNewSchedule />
      <br></br>
      <Table
        columns={columns}
        dataSource={dataTable}
        bordered
        footer={() => (
          <b>
            <p className="text-right">TOTAL RECORD: {count}</p>
          </b>
        )}
      />
    </div>
  );
};

export default ViewAllSchedule;
