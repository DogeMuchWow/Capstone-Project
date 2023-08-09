import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { Table, message } from "antd";

const AdminViewClassAccount = (props) => {
  const [dataTable, setDataTable] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getClassAccount() {
      try {
        const response = await axios.get(props?.url);
        setDataTable(response?.data);
        setCount(response?.data?.length);
      } catch (error) {
        message.error("Can not get class student list");
      }
    }
    getClassAccount();
  }, [props]);

  const columns = [
    {
      title: "Account",
      dataIndex: "accountCode",
      key: "accountCode",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <div>{text}</div>,
    },
  ];
  return (
    <div>
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

export default AdminViewClassAccount;
