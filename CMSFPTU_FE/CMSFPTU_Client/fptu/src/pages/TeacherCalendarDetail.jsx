import TeacherCalendarDetailMain from "../components/Teacher/Calendar/TeacherCalendarDetailMain";
import { useParams } from "react-router-dom";

const TeacherCalendarDetail = () => {
  const { scheduleId } = useParams();
  return (
    <div>
      <TeacherCalendarDetailMain scheduleId={scheduleId} />
    </div>
  );
};

export default TeacherCalendarDetail;
