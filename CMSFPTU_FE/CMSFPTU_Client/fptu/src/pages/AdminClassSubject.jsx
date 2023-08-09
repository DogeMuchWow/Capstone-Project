import AdminClassSubjectMain from "../components/Admin/ClassSubject/AdminClassSubjectMain";

const AdminClassSubject = (props) => {
  return (
    <div>
      <AdminClassSubjectMain deleted={props?.deleted} />
    </div>
  );
};

export default AdminClassSubject;
