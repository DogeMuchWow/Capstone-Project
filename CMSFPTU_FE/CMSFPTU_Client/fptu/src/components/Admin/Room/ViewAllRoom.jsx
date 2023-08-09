import axios from "../../../api/axios";
import ViewRoomModal from "./ViewRoomModal";
import EditRoomModal from "./EditRoomModal";
import DeleteRoomModal from "./DeleteRoomModal";
import RestoreRoom from "./RestoreRoom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Table, Input, message } from "antd";
import { reloading } from "../../../features/pageSlice";

const ViewAllRoom = (props) => {
  const ROOM_VIEW_URL = "/Room/get-room?id=";
  const DELETED_ROOM_VIEW_URL = "/Room/get-room-deleted?id=";
  const ROOM_EDIT_URL = "/Room/update?id=";
  const ROOM_DELETE_URL = "/Room/delete?id=";
  const ROOM_RESTORE_URL = "/Room/restore?id=";
  const ROOM_SEARCH_URL = "/Room/search-room?keyword=";
  const DELETED_ROOM_SEARCH_URL = "/Room/search-room-deleted?keyword=";
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
    async function searchRoom() {
      try {
        const response = await axios.get(
          props?.deleted
            ? DELETED_ROOM_SEARCH_URL + encodeURIComponent(search)
            : ROOM_SEARCH_URL + encodeURIComponent(search)
        );
        setSearchData(response.data);
        setSearchCount(response.data.length);
      } catch (error) {
        message.error("Search fail");
      }
    }
    searchRoom();
  }, [pageReload, search]);

  const columns = [
    {
      title: "Room number",
      dataIndex: "roomNumber",
      key: "roomNumber",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Room type",
      dataIndex: ["type", "typeName"],
      key: "typeName",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="btn-group">
          {props.deleted === false ? (
            <ViewRoomModal data={record} url={ROOM_VIEW_URL + record?.roomId} />
          ) : (
            <ViewRoomModal
              data={record}
              url={DELETED_ROOM_VIEW_URL + record?.roomId}
            />
          )}
          {props.deleted === false ? (
            <EditRoomModal data={record} url={ROOM_EDIT_URL + record?.roomId} />
          ) : (
            ""
          )}
          {props.deleted === false ? (
            <DeleteRoomModal
              data={record}
              url={ROOM_DELETE_URL + record?.roomId}
            />
          ) : (
            <RestoreRoom
              data={record}
              url={ROOM_RESTORE_URL + record?.roomId}
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

export default ViewAllRoom;
