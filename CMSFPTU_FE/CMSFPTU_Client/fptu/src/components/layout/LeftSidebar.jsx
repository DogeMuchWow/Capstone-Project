import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu } from "antd";

const LeftSidebar = (props) => {
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const studentItems = [
    getItem(
      <Link to="/student/calendar" className="dropdown-toggle no-arrow">
        <span className="mtext">Calendar</span>
      </Link>,
      "Calendar",
      <span className="micon dw dw-calendar1"></span>
    ),
  ];

  const teacherItems = [
    getItem(
      <a className="dropdown-toggle no-arrow">
        <span className="mtext">Request</span>
      </a>,
      "request",
      <span className="micon dw dw-library"></span>,
      [
        getItem(<Link to="/teacher/request">My Request</Link>, "myrequest"),
        getItem(
          <Link to="/teacher/createrequest">Create Request</Link>,
          "newrequest"
        ),
      ]
    ),
    getItem(
      <Link to="/teacher/classroom" className="dropdown-toggle no-arrow">
        <span className="mtext">Classroom</span>
      </Link>,
      "classroom",
      <span className="micon dw dw-list3"></span>
    ),
    getItem(
      <Link to="/teacher/calendar" className="dropdown-toggle no-arrow">
        <span className="mtext">Calendar</span>
      </Link>,
      "calendar",
      <span className="micon dw dw-calendar1"></span>
    ),
  ];

  const adminItems = [
    getItem(
      <Link to="/admin/request" className="dropdown-toggle no-arrow">
        <span className="mtext">Request</span>
      </Link>,
      "request",
      <span className="micon dw dw-notebook"></span>
    ),
    getItem(
      <a className="dropdown-toggle no-arrow">
        <span className="mtext">Management</span>
      </a>,
      "management",
      <span className="micon dw dw-library"></span>,
      [
        getItem(<Link to="/admin/account">Account</Link>, "account"),
        getItem(<Link to="/admin/class">Class</Link>, "class"),
        getItem(<Link to="/admin/subject">Subject</Link>, "subject"),
        getItem(<Link to="/admin/room">Room</Link>, "room"),
        getItem(<Link to="/admin/roomtype">Room type</Link>, "roomtype"),
        getItem(
          <Link to="/admin/classsubject">Class and Subject</Link>,
          "classSubject"
        ),
        getItem(<Link to="/admin/schedule">Schedule</Link>, "schedule"),
        getItem(<Link to="/admin/classroom">Classroom</Link>, "classroom"),
      ]
    ),
    getItem(
      <a className="dropdown-toggle no-arrow">
        <span className="mtext">Deleted Management</span>
      </a>,
      "deletedmanagement",
      <span className="micon dw dw-library"></span>,
      [
        getItem(
          <Link to="/admin/deleted/account">Account</Link>,
          "deletedAccount"
        ),
        getItem(
          <Link to="/admin/deleted/subject">Subject</Link>,
          "deletedSubject"
        ),
        getItem(<Link to="/admin/deleted/room">Room</Link>, "deletedRoom"),
        getItem(
          <Link to="/admin/deleted/roomtype">Room type</Link>,
          "deletedRoomType"
        ),
        getItem(
          <Link to="/admin/deleted/classsubject">Class Subject</Link>,
          "deletedClassSubject"
        ),
      ]
    ),
  ];
  return (
    <div>
      {props.role === "2" ? (
        <div className="left-side-bar">
          <div class="brand-logo">
            <Link to="/admin/request">
              <img
                src="http://localhost:3000/vendors/images/FPTU_logo_1.png"
                alt=""
              />
            </Link>
          </div>
          <div className="menu-block customscroll">
            <Menu
              defaultSelectedKeys={["request"]}
              mode="inline"
              theme="dark"
              onClick={onClick}
              selectedKeys={current}
              items={adminItems}
            />
          </div>
        </div>
      ) : props.role === "3" ? (
        <div className="left-side-bar">
          <div class="brand-logo">
            <Link to="/teacher/request">
              <img
                src="http://localhost:3000/vendors/images/FPTU_logo_1.png"
                alt=""
              />
            </Link>
          </div>
          <div className="menu-block customscroll">
            <Menu
              defaultSelectedKeys={["myrequest"]}
              mode="inline"
              theme="dark"
              onClick={onClick}
              selectedKeys={current}
              items={teacherItems}
            />
          </div>
        </div>
      ) : props.role === "4" ? (
        <div className="left-side-bar">
          <div class="brand-logo">
            <Link to="/student/calendar">
              <img
                src="http://localhost:3000/vendors/images/FPTU_logo_1.png"
                alt=""
              />
            </Link>
          </div>
          <div className="menu-block customscroll">
            <Menu
              defaultSelectedKeys={["calendar"]}
              mode="inline"
              theme="dark"
              onClick={onClick}
              selectedKeys={current}
              items={studentItems}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LeftSidebar;
