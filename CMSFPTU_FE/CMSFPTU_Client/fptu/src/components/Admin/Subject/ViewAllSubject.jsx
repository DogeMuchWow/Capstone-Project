import axios from "../../../api/axios";
import AddNewSubjectModal from "./AddNewSubjectModal";
import ViewSubjectModal from "./ViewSubjectModal";
import EditSubjectModal from "./EditSubjectModal";
import DeleteSubjectModal from "./DeleteSubjectModal";
import RestoreSubject from "./RestoreSubject";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Table, Input, message } from "antd";
import { reloading } from "../../../features/pageSlice";

const ViewAllSubject = (props) => {
  const SUBJECT_VIEW_URL = "/Subject/get-subject?id=";
  const DELETED_SUBJECT_VIEW_URL = "/Subject/get-subject-deleted?id=";
  const SUBJECT_EDIT_URL = "/Subject/update?id=";
  const SUBJECT_DELETE_URL = "/Subject/delete?id=";
  const SUBJECT_RESTORE_URL = "/Subject/restore?id=";
  const SUBJECT_SEARCH_URL = "/Subject/search-subject?keyword=";
  const DELETED_SUBJECT_SEARCH_URL = "/Subject/search-subject-deleted?keyword=";
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [dataTable, setDataTable] = useState("");
  const dispatch = useDispatch();
  const pageReload = useSelector((state) => state.page.reloading);
  const [count, setCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const { Search } = Input;

  useEffect(() => {
    async function getAllSubject() {
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
        message.error("Can not get subject");
      }
    }
    getAllSubject();
  }, [pageReload, props]);

  useEffect(() => {
    async function searchSubject() {
      try {
        const response = await axios.get(
          props?.deleted
            ? DELETED_SUBJECT_SEARCH_URL + encodeURIComponent(search)
            : SUBJECT_SEARCH_URL + encodeURIComponent(search)
        );
        setSearchData(response.data);
        setSearchCount(response.data.length);
      } catch (error) {
        message.error("Search fail");
      }
    }
    searchSubject();
  }, [search]);

  const columns = [
    {
      title: "Subject Code",
      dataIndex: "subjectCode",
      key: "subjectCode",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Subject Name",
      dataIndex: "subjectName",
      key: "subjectName",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="btn-group">
          {props.deleted === false ? (
            <ViewSubjectModal
              data={record}
              url={SUBJECT_VIEW_URL + record?.subjectId}
            />
          ) : (
            <ViewSubjectModal
              data={record}
              url={DELETED_SUBJECT_VIEW_URL + record?.subjectId}
            />
          )}
          {props.deleted === false ? (
            <EditSubjectModal
              data={record}
              url={SUBJECT_EDIT_URL + record?.subjectId}
            />
          ) : (
            ""
          )}
          {props.deleted === false ? (
            <DeleteSubjectModal
              data={record}
              url={SUBJECT_DELETE_URL + record?.subjectId}
            />
          ) : (
            <RestoreSubject
              data={record}
              url={SUBJECT_RESTORE_URL + record?.subjectId}
            />
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      {props?.deleted === false ? <AddNewSubjectModal /> : ""}
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

export default ViewAllSubject;
