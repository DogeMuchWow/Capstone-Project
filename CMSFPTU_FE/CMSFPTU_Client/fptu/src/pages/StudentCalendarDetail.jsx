import StudentCalendarDetailMain from "../components/Student/Calendar/StudentCalendarDetailMain";
import { useParams } from "react-router-dom";

const StudentCalendarDetail = () => {
  const { scheduleId } = useParams();
  return (
    <div>
      <StudentCalendarDetailMain scheduleId={scheduleId} />
    </div>
  );
};

export default StudentCalendarDetail;
