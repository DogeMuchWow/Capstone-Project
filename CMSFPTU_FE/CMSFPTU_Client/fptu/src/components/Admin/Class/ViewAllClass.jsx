import axios from "../../../api/axios";
import ViewClassDetail from "./ViewClassDetail";
import DeleteClass from "./DeleteClass";
import RestoreClass from "./RestoreClass";
import EditClass from "./EditClass";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Table, Input, message } from "antd";
import { reloading } from "../../../features/pageSlice";

const ViewAllClass = (props) => {
  const CLASS_VIEW_URL = "/Class/get-class?id=";
  const DELETED_CLASS_VIEW_URL = "/Class/get-Class-deleted?id=";
  const CLASS_EDIT_URL = "/Class/update?id=";
  const CLASS_DELETE_URL = "/Class/delete?id=";
  const CLASS_RESTORE_URL = "/Class/restore?id=";
  const CLASS_SEARCH_URL = "/Class/search-class?keyword=";
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [count, setCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const { Search } = Input;
  const [dataTable, setDataTable] = useState([]);
  const dispatch = useDispatch();
  const pageReload = useSelector((state) => state.page.reloading);

  useEffect(() => {
    async function getAllClass() {
      try {
        const response = await axios.get(props?.url);
        setDataTable(response?.data);
        setCount(response?.data?.length);
        dispatch(
          reloading({
            reloading: false,
          })
        );
      } catch (error) {
        message.error("Can not get class");
      }
    }
    getAllClass();
  }, [pageReload, props]);

  useEffect(() => {
    async function searchClass() {
      try {
        const response = await axios.get(
          CLASS_SEARCH_URL + encodeURIComponent(search)
        );
        setSearchData(response.data);
        setSearchCount(response.data.length);
      } catch (error) {
        message.error("Search fail");
      }
    }
    searchClass();
  }, [search]);

  const columns = [
    {
      title: "Class Code",
      dataIndex: "classCode",
      key: "classCode",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="btn-group">
          {props.deleted === false ? (
            <ViewClassDetail
              data={record}
              url={CLASS_VIEW_URL + record?.classId}
            />
          ) : (
            <ViewClassDetail
              data={record}
              url={DELETED_CLASS_VIEW_URL + record?.classId}
            />
          )}
          {props.deleted === false ? (
            <EditClass data={record} url={CLASS_EDIT_URL + record?.classId} />
          ) : (
            ""
          )}
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="input-group">
        <Search
          className="boxClass"
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

export default ViewAllClass;
