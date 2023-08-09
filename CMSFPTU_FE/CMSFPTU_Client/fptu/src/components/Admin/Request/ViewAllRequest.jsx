import axios from "../../../api/axios";
import { Table, Input, message, Tag } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reloading } from "../../../features/pageSlice";
import AdminApproveRequest from "./AdminApproveRequest";
import AdminRejectRequest from "./AdminRejectRequest";

const ViewAllRequest = (props) => {
  const REQUEST_SEARCH = "/RequestTeacher/search-request-from-teacher?keyword=";
  const REQUEST_APPROVE = "/RequestTeacher/request-approval?id=";
  const REQUEST_REJECT = "/RequestTeacher/request-reject?id=";
  const [dataTable, setDataTable] = useState([]);
  const pageReload = useSelector((state) => state.page.reloading);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [searchCount, setSearchCount] = useState("");
  const [count, setCount] = useState(0);
  const { Search } = Input;
  const dispatch = useDispatch();

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

  useEffect(() => {
    async function getAllRequest() {
      try {
        const response = await axios.get(props?.url);
        setDataTable(response.data);
        setCount(response.data.length);
        dispatch(
          reloading({
            reloading: false,
          })
        );
      } catch (error) {
        message.error("Can not get request");
      }
    }
    getAllRequest();
  }, [pageReload, search]);

  useEffect(() => {
    async function searchRequest() {
      try {
        const response = await axios.get(
          REQUEST_SEARCH + encodeURIComponent(search)
        );
        setSearchData(response.data);
        setSearchCount(response.data.length);
      } catch (error) {
        message.error("Search fail");
      }
    }
    searchRequest();
  }, [pageReload, search]);

  const columns = [
    {
      title: "Request name",
      dataIndex: ["requestType", "requestName"],
      key: "requestName",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Class",
      dataIndex: ["class", "classCode"],
      key: "classCode",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Subject",
      dataIndex: ["subject", "subjectCode"],
      key: "subjectCode",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Room",
      dataIndex: ["room", "roomNumber"],
      key: "roomId",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Request by",
      dataIndex: "requestByUser",
      key: "requestByUser",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Request date",
      dataIndex: "requestDate",
      key: "requestDate",
      render: (text) => <div>{getFormattedDate(text)}</div>,
    },
    {
      title: "Start Time",
      dataIndex: ["slot", "startTime"],
      key: "startTime",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "End Time",
      dataIndex: ["slot", "endTime"],
      key: "endTime",
      render: (text) => <div>{text}</div>,
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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <div className="btn btn-group mr-1">
            <AdminApproveRequest url={REQUEST_APPROVE + record?.requestId} />
            <AdminRejectRequest url={REQUEST_REJECT + record?.requestId} />
          </div>
        </>
      ),
    },
  ];
  return (
    <div>
      <div className="input-group">
        <Search
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          enterButton
          style={{ width: 300 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={search ? searchData : dataTable}
        bordered
        footer={() => (
          <b>
            {
              <p className="text-right">
                TOTAL RECORD: {search ? searchCount : count}
              </p>
            }
          </b>
        )}
      />
    </div>
  );
};

export default ViewAllRequest;
