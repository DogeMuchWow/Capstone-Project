import SubjectTable from "../components/Admin/Subject/SubjectTable";

const AdminSubject = (props) => {
  return (
    <div>
      <SubjectTable deleted={props?.deleted} />
    </div>
  );
};

export default AdminSubject;
