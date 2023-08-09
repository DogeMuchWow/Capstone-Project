import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Header from "./components/layout/Header";
import LeftSidebar from "./components/layout/LeftSidebar";
import RightSidebar from "./components/layout/RightSidebar";
import Profile from "./pages/Profile";

import PrivateRoutes from "./utils/PrivateRoutes";
import AdminAccount from "./pages/AdminAccount";
import AdminSubject from "./pages/AdminSubject";
import AdminRoom from "./pages/AdminRoom";
import AdminRoomType from "./pages/AdminRoomType";
import AdminClass from "./pages/AdminClass";
import AdminClassSubject from "./pages/AdminClassSubject";
import AdminRequest from "./pages/AdminRequest";
import AdminClassAccount from "./pages/AdminClassAccount";
import AdminClassroomManagement from "./pages/AdminClassroomManagement";
import TeacherRequest from "./pages/TeacherRequest";
import TeacherCalendar from "./pages/TeacherCalendar";
import StudentCalendar from "./pages/StudentCalendar";
import AdminScheduleManagement from "./pages/AdminScheduleManagement";
import TeacherCreateNewRequest from "./pages/TeacherCreateNewRequest";
import TeacherCalendarDetail from "./pages/TeacherCalendarDetail";
import StudentCalendarDetail from "./pages/StudentCalendarDetail";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

function App() {
  const role = useSelector((state) => state.user.roleId);
  return (
    <>
      <Header></Header>
      <LeftSidebar role={role}></LeftSidebar>
      <RightSidebar></RightSidebar>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes allowRoles={["2"]} />}>
          <Route
            path="/admin/account"
            element={<AdminAccount deleted={false} />}
          />
          <Route
            path="/admin/deleted/account"
            element={<AdminAccount deleted={true} />}
          />
          <Route path="/admin/class" element={<AdminClass deleted={false} />} />
          <Route
            path="/admin/subject"
            element={<AdminSubject deleted={false} />}
          />
          <Route
            path="/admin/deleted/subject"
            element={<AdminSubject deleted={true} />}
          />
          <Route path="/admin/room" element={<AdminRoom deleted={false} />} />
          <Route
            path="/admin/deleted/room"
            element={<AdminRoom deleted={true} />}
          />
          <Route
            path="/admin/roomtype"
            element={<AdminRoomType deleted={false} />}
          />
          <Route
            path="/admin/deleted/roomtype"
            element={<AdminRoomType deleted={true} />}
          />
          <Route
            path="/admin/classsubject"
            element={<AdminClassSubject deleted={false} />}
          />
          <Route
            path="/admin/deleted/classsubject"
            element={<AdminClassSubject deleted={true} />}
          />
          <Route path="/admin/request" element={<AdminRequest />} />
          <Route
            path="/admin/classaccount/:classid"
            element={<AdminClassAccount />}
          />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/schedule" element={<AdminScheduleManagement />} />
          <Route
            path="/admin/classroom"
            element={<AdminClassroomManagement />}
          />
        </Route>
        <Route element={<PrivateRoutes allowRoles={["3"]} />}>
          <Route
            path="/teacher/classroom"
            element={<AdminClassroomManagement />}
          />
          <Route path="/teacher/request" element={<TeacherRequest />} />
          <Route
            path="/teacher/createrequest"
            element={<TeacherCreateNewRequest />}
          />
          <Route path="/teacher/calendar" element={<TeacherCalendar />} />
          <Route
            path="/teacher/calendardetail/:scheduleId"
            element={<TeacherCalendarDetail />}
          />
          <Route path="/teacher/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoutes allowRoles={["4"]} />}>
          <Route path="/student/calendar" element={<StudentCalendar />} />
          <Route
            path="/student/calendardetail/:scheduleId"
            element={<StudentCalendarDetail />}
          />
          <Route path="/student/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
