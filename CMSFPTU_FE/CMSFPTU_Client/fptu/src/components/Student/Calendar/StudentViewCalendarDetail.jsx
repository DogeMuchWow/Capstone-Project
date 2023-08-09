import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { message, Table } from "antd";

const StudentViewCalendarDetail = (props) => {
  const [calendarDetail, setCalendarDetail] = useState([]);
  const [classAccountData, setClassAccountData] = useState("");
  const [count, setCount] = useState(0);
  const accountId = useSelector((state) => state.user.accountID);

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
    async function getCalendar() {
      try {
        const response = await axios.get(
          "/Schedule/get-schedule?scheduleId=" +
            props.data +
            "&accountId=" +
            accountId
        );
        setCalendarDetail(response?.data);
        console.log(response);
      } catch (error) {
        console.log(error);
        message.error("Can not get calendar");
      }
    }
    getCalendar();
  }, []);

  useEffect(() => {
    async function getClassAccount() {
      try {
        const response = await axios.get(
          "/ClassSubject/get-accounts?classId=" +
            calendarDetail?.body?.classSubject?.classId
        );
        setClassAccountData(response?.data);
        setCount(response?.data?.length);
      } catch (error) {
        console.log(error);
      }
    }
    getClassAccount();
  }, [calendarDetail?.body?.classSubject?.classId]);

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
  ];
  return (
    <div>
      <div className="pd-20 card-box height-100-p">
        <div class="profile-info">
          <div className="row">
            <div className="col">
              <ul>
                <li>
                  Date: {getFormattedDate(calendarDetail?.body?.scheduleDate)}
                </li>
                <li>
                  Slot: {calendarDetail?.body?.slot?.slotId} (
                  {calendarDetail?.body?.slot?.startTime}-
                  {calendarDetail?.body?.slot?.endTime})
                </li>
                <li>
                  Subject:{" "}
                  {calendarDetail?.body?.classSubject?.subject?.subjectName}{" "}
                  {"("}
                  {calendarDetail?.body?.classSubject?.subject?.subjectCode}
                  {")"}
                </li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <li>
                  Class: {calendarDetail?.body?.classSubject?.class?.classCode}
                </li>
                <li>Room: {calendarDetail?.body?.room?.roomNumber}</li>
              </ul>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={classAccountData}
          bordered
          footer={() => (
            <b>
              <p className="text-right">TOTAL RECORD: {count}</p>
            </b>
          )}
        />
      </div>
    </div>
  );
};

export default StudentViewCalendarDetail;
