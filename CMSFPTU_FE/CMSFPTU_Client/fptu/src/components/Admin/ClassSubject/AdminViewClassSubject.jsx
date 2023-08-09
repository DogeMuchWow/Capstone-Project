import axios from "../../../api/axios";
import AdminAddNewClassSubject from "./AdminAddNewClassSubject";
import AdminViewClassSubjectDetail from "./AdminViewClassSubjectDetail";
import AdminEditClassSubject from "./AdminEditClassSubject";
import AdminDeleteClassSubject from "./AdminDeleteClassSubject";
import AdminRestoreClassSubject from "./AdminRestoreClassSubject";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Table, Input, message } from "antd";
import { reloading } from "../../../features/pageSlice";
import { Link } from "react-router-dom";

const AdminViewClassSubject = (props) => {
  const CLASS_SUBJECT_VIEW_URL = "/ClassSubject/get-class-subject?id=";
  const DELETED_CLASS_SUBJECT_VIEW_URL =
    "/ClassSubject/get-class-subject-deleted?id=";
  const CLASS_SUBJECT_EDIT_URL = "/ClassSubject/update?id=";
  const CLASS_SUBJECT_DELETE_URL = "/ClassSubject/delete?id=";
  const CLASS_SUBJECT_RESTORE_URL = "/ClassSubject/restore?id=";
  const CLASS_SUBJECT_SEARCH_URL =
    "/ClassSubject/search-class-subject?keyword=";
  const DELETED_CLASS_SUBJECT_SEARCH_URL =
    "/ClassSubject/search-class-subject-deleted?keyword=";
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [dataTable, setDataTable] = useState("");
  const dispatch = useDispatch();
  const pageReload = useSelector((state) => state.page.reloading);
  const [count, setCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const { Search } = Input;

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
    async function getAllClassSubject() {
      try {
        const response = await axios.get(props?.url);
        setDataTable(response?.data);
        setCount(response?.data.length);
        dispatch(
          reloading({
            reloading: false,
          })
        );
      } catch (error) {
        message.error("Can not get class subject");
      }
    }
    getAllClassSubject();
  }, [pageReload, props]);

  useEffect(() => {
    async function searchSubject() {
      try {
        const response = await axios.get(
          props?.deleted
            ? DELETED_CLASS_SUBJECT_SEARCH_URL + encodeURIComponent(search)
            : CLASS_SUBJECT_SEARCH_URL + encodeURIComponent(search)
        );
        setSearchData(response?.data);
        setSearchCount(response?.data?.length);
      } catch (error) {
        message.error("Search fail");
      }
    }
    searchSubject();
  }, [search]);

  const columns = [
    {
      title: "Class code",
      dataIndex: "classCode",
      key: "classCode",
      render: (text, record) => (
        <Link to={"/admin/classaccount/" + record?.classId}>{text}</Link>
      ),
    },
    {
      title: "Subject code",
      dataIndex: ["subject", "subjectCode"],
      key: "subjectCode",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <div>{getFormattedDate(text)}</div>,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => <div>{getFormattedDate(text)}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="btn-group">
          {props?.deleted === false ? (
            <AdminViewClassSubjectDetail
              data={record}
              url={CLASS_SUBJECT_VIEW_URL + record?.classSubjectId}
            />
          ) : (
            <AdminViewClassSubjectDetail
              data={record}
              url={DELETED_CLASS_SUBJECT_VIEW_URL + record?.classSubjectId}
            />
          )}
          {props.deleted === false ? (
            <AdminEditClassSubject
              data={record}
              url={CLASS_SUBJECT_EDIT_URL + record?.classSubjectId}
            />
          ) : (
            ""
          )}
          {props.deleted === false ? (
            <AdminDeleteClassSubject
              data={record}
              url={CLASS_SUBJECT_DELETE_URL + record?.classSubjectId}
            />
          ) : (
            <AdminRestoreClassSubject
              data={record}
              url={CLASS_SUBJECT_RESTORE_URL + record?.classSubjectId}
            />
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      {props?.deleted === false ? <AdminAddNewClassSubject /> : ""}
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

export default AdminViewClassSubject;
