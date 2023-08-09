import axios from "../../../api/axios";
import React from "react";
import { Table, Input, message } from "antd";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteAccount from "./DeleteAccount";
import { reloading } from "../../../features/pageSlice";
import ViewAccountData from "./ViewAccountData";
import EditAccountData from "./EditAccountData";
import RestoreAccount from "./RestoreAccount";

const ViewAllAccount = (props) => {
  const [dataTable, setDataTable] = useState([]);
  const dispatch = useDispatch();
  const pageReload = useSelector((state) => state.page.reloading);
  const ACCOUNT_VIEW_DETAIL = "/Account/get-account?id=";
  const ACCOUNT_DELETED_VIEW_DETAIL = "/Account/get-account-deleted?id=";
  const ACCOUNT_EDIT = "/Account/update?id=";
  const ACCOUNT_DELETED = "/Account/delete?id=";
  const ACCOUNT_RESTORE = "/Account/restore?id=";
  const ACCOUNT_SEARCH_URL = "/Account/search-account?keyword=";
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [count, setCount] = useState(0);
  const [searchCount, setSearchCount] = useState(0);
  const { Search } = Input;

  useEffect(() => {
    async function getAllAccount() {
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
        message.error("Can not get Account");
      }
    }
    getAllAccount();
  }, [pageReload, props]);

  useEffect(() => {
    async function searchAccount() {
      try {
        const response = await axios.get(
          ACCOUNT_SEARCH_URL + encodeURIComponent(search)
        );
        setSearchData(response.data);
        setSearchCount(response.data.length);
      } catch (error) {
        message.error("Search fail");
      }
    }
    searchAccount();
  }, [search]);

  useEffect(() => {
    async function fetchMyAPI() {
      const data = await axios.get(props.url);
      setDataTable(data.data);
      dispatch(
        reloading({
          reloading: false,
        })
      );
    }

    fetchMyAPI();
  }, [pageReload]);

  const columns = [
    {
      title: "Account",
      dataIndex: "accountCode",
      key: "account",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => <div>{gender ? "Male" : "Female"}</div>,
    },
    {
      title: "Class",
      dataIndex: ["class", "classCode"],
      key: ["class", "classCode"],
    },
    {
      title: "Role",
      dataIndex: ["role", "roleCode"],
      key: ["role", "roleCode"],
    },
    // {
    //   title: "Status",
    //   dataIndex: "systemStatusId",
    //   key: "systemStatusId",
    //   render: (role) => <div>{role}</div>,
    // },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <div className="btn-group">
            {props.deleted === false ? (
              <ViewAccountData
                data={record}
                url={ACCOUNT_VIEW_DETAIL + record?.accountId}
              />
            ) : (
              <ViewAccountData
                data={record}
                url={ACCOUNT_DELETED_VIEW_DETAIL + record?.accountId}
              />
            )}
            {props.deleted === false ? (
              <EditAccountData
                data={record}
                url={ACCOUNT_EDIT + record?.accountId}
              />
            ) : (
              ""
            )}
            {props.deleted === false ? (
              <DeleteAccount
                data={record}
                url={ACCOUNT_DELETED + record?.accountId}
              />
            ) : (
              <RestoreAccount
                data={record}
                url={ACCOUNT_RESTORE + record?.accountId}
              />
            )}
          </div>
        </>
      ),
    },
  ];
  return (
    <div>
      <div className="input-group">
        <Search
          className="boxAccount"
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

export default ViewAllAccount;
