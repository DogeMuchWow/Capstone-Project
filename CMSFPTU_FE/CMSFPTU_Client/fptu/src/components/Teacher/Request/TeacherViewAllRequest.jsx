import axios from "../../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Table, Input, message, Tag } from "antd";
import { reloading } from "../../../features/pageSlice";

import TeacherViewRequestDetail from "./TeacherViewRequestDetail";
import TeacherDeleteRequest from "./TeacherDeleteRequest";

const TeacherViewAllRequest = () => {
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [dataTable, setDataTable] = useState("");
  const dispatch = useDispatch();
  const pageReload = useSelector((state) => state.page.reloading);
  const accountId = useSelector((state) => state.user.accountID);
  const [count, setCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const { Search } = Input;
  const [filteredInfo, setFilteredInfo] = useState({});

  const ADD_NEW_REQUEST_URL = "/RequestTeacher/create";
  const TEACHER_VIEW_ALL_REQUEST_URL =
    "/RequestTeacher/get-by-accountId?accountId=";
  const REQUEST_VIEW_DETAIL = "/RequestTeacher/get-request-teacher?id=";
  const REQUEST_SEARCH =
    "/RequestTeacher/search-teacher-request?keyword=" +
    encodeURIComponent(search) +
    "&accountId=" +
    encodeURIComponent(accountId);
  const TEACHER_DELETE_REQUEST = "/RequestTeacher/delete?id=";

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
        const response = await axios.get(
          TEACHER_VIEW_ALL_REQUEST_URL + accountId
        );
        setDataTable(response.data);
        setCount(response.data.length);
        dispatch(
          reloading({
            reloading: false,
          })
        );
      } catch (error) {
        message.error("Can not get subject");
      }
    }
    getAllRequest();
  }, [pageReload]);

  useEffect(() => {
    async function searchRequest() {
      try {
        const response = await axios.get(REQUEST_SEARCH);
        setSearchData(response.data);
        setSearchCount(response.data.length);
      } catch (error) {
        message.error("Search fail");
      }
    }
    searchRequest();
  }, [search]);

  const columns = [
    {
      title: "Request Name",
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
      key: "roomNumber",
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
      filters: [
        {
          text: "Pending",
          value: "3",
        },
        {
          text: "Approved",
          value: "4",
        },
        {
          text: "Rejected",
          value: "5",
        },
      ],
      filteredValue: filteredInfo.systemStatusId || null,
      onFilter: (value, record) =>
        record?.systemStatusId.toString().includes(value),
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
        <div className="btn-group">
          <TeacherViewRequestDetail
            data={record}
            url={REQUEST_VIEW_DETAIL + record?.requestId}
          />
          <TeacherDeleteRequest
            data={record}
            url={TEACHER_DELETE_REQUEST + record?.requestId}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <br></br>
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
        onChange={(pagination, filters, sorter) => {
          setFilteredInfo(filters);
        }}
        bordered
        footer={() => (
          <b>
            <p className="text-right">
              TOTAL RECORD: {search ? searchCount : count}
            </p>
          </b>
        )}
      />
    </div>
  );
};

export default TeacherViewAllRequest;
