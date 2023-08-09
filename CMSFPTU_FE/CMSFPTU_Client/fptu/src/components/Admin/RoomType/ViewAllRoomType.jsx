import axios from "../../../api/axios";
import ViewRoomTypeModal from "./ViewRoomTypeModal";
import EditRoomTypeModal from "./EditRoomTypeModal";
import DeleteRoomTypeModal from "./DeleteRoomTypeModal";
import RestoreRoomType from "./RestoreRoomType";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Table, message, Input } from "antd";
import { reloading } from "../../../features/pageSlice";

const ViewAllRoomType = (props) => {
  const ROOMTYPE_VIEW_URL = "/RoomType/get-room-type?id=";
  const DELETED_ROOMTYPE_VIEW_URL = "/RoomType/get-room-type-deleted?id=";
  const ROOMTYPE_EDIT_URL = "/RoomType/update?id=";
  const ROOMTYPE_DELETE_URL = "/RoomType/delete?id=";
  const ROOMTYPE_RESTORE_URL = "/RoomType/restore?id=";
  const ROOMTYPE_SEARCH_URL = "/RoomType/search-room-type?keyword=";
  const DELETED_SUBJECT_SEARCH_URL =
    "/RoomType/search-room-type-deleted?keyword=";
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const dispatch = useDispatch();
  const pageReload = useSelector((state) => state.page.reloading);
  const [count, setCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const { Search } = Input;

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await axios.get(props?.url);
      setDataTable(response.data);
      setCount(response.data.length);
      dispatch(
        reloading({
          reloading: false,
        })
      );
    }
    fetchMyAPI();
  }, [pageReload, props]);

  useEffect(() => {
    async function searchRoomType() {
      try {
        const response = await axios.get(
          props?.deleted
            ? DELETED_SUBJECT_SEARCH_URL + encodeURIComponent(search)
            : ROOMTYPE_SEARCH_URL + encodeURIComponent(search)
        );
        setSearchData(response.data);
        setSearchCount(response.data.length);
      } catch (error) {
        message.error("Search fail");
      }
    }
    searchRoomType();
  }, [search]);

  const columns = [
    {
      title: "Code",
      dataIndex: "typeCode",
      key: "typeCode",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Name",
      dataIndex: "typeName",
      key: "typeName",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="btn-group">
          {props.deleted === false ? (
            <ViewRoomTypeModal
              data={record}
              url={ROOMTYPE_VIEW_URL + record?.typeId}
            />
          ) : (
            <ViewRoomTypeModal
              data={record}
              url={DELETED_ROOMTYPE_VIEW_URL + record?.typeId}
            />
          )}
          {props.deleted === false ? (
            <EditRoomTypeModal
              data={record}
              url={ROOMTYPE_EDIT_URL + record?.typeId}
            />
          ) : (
            ""
          )}
          {props.deleted === false ? (
            <DeleteRoomTypeModal
              data={record}
              url={ROOMTYPE_DELETE_URL + record?.typeId}
            />
          ) : (
            <RestoreRoomType
              data={record}
              url={ROOMTYPE_RESTORE_URL + record?.typeId}
            />
          )}
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

export default ViewAllRoomType;
