import RoomTable from "../components/Admin/Room/RoomTable";

const AdminRoom = (props) => {
  return (
    <div>
      <RoomTable deleted={props?.deleted} />
    </div>
  );
};

export default AdminRoom;
