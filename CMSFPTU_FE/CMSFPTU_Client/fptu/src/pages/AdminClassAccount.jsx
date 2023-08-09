import AdminViewClassAccountMain from "../components/Admin/ClassSubject/AdminViewClassAccountMain";
import { useParams } from "react-router-dom";

const AdminClassAccount = () => {
  const { classid } = useParams();
  return (
    <div>
      <AdminViewClassAccountMain classId={classid} />
    </div>
  );
};

export default AdminClassAccount;
