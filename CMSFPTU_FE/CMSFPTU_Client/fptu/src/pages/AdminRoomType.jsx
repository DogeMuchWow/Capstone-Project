import RoomTypeTable from "../components/Admin/RoomType/RoomTypeTable";

const AdminRoomType = (props) => {
  return (
    <div>
      <RoomTypeTable deleted={props?.deleted} />
    </div>
  );
};

export default AdminRoomType;
