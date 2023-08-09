import axios from "../../../api/axios";
import { WeeklyCalendar } from "antd-weekly-calendar";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { message } from "antd";
import { parseISO } from "date-fns";
import { Link } from "react-router-dom";

const TeacherViewCalender = () => {
  const [calendar, setCalendar] = useState([]);
  const accountId = useSelector((state) => state.user.accountID);
  useEffect(() => {
    async function getCalendar() {
      try {
        const response = await axios.get("/Schedule?accountId=" + accountId);
        setCalendar(response.data);
      } catch (error) {
        console.log(error);
        message.error("Can not get calendar");
      }
    }
    getCalendar();
  }, []);

  const options = calendar.map(function (row) {
    return {
      startTime: parseISO(row?.startTime),
      endTime: parseISO(row?.endTime),
      title: (
        <ul className="list-group">
          <li>Subject: {row?.classSubject?.subject?.subjectCode}</li>
          <li>Room: {row?.room?.roomNumber}</li>
          <li>
            Time: {row?.slot?.startTime}-{row?.slot?.endTime}
          </li>
          <li>
            <Link to={"/teacher/calendardetail/" + row?.scheduleId}>
              Detail
            </Link>
          </li>
        </ul>
      ),
    };
  });

  return (
    <div>
      <WeeklyCalendar
        weekends
        events={options}
        onEventClick={(event) => console.log(event)}
        onSelectDate={(date) => console.log(date)}
      />
    </div>
  );
};

export default TeacherViewCalender;
