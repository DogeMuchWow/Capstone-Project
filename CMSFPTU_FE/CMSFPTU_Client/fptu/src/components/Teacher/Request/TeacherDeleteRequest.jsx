import axios from "../../../api/axios";
import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const TeacherDeleteRequest = (props) => {
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    try {
      await axios.delete(props?.url);
      message.success("Subject deleted successfully");
      dispatch(
        reloading({
          reloading: true,
        })
      );
    } catch (error) {
      message.error("Delete failed!");
      console.log(error);
      dispatch(
        reloading({
          reloading: false,
        })
      );
    }
  };

  const cancel = () => {
    message.error("Cancel delete");
    dispatch(
      reloading({
        reloading: false,
      })
    );
  };

  return (
    <div>
      <Popconfirm
        title="Are you sure to delete this request?"
        onConfirm={handleDelete}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{ background: "yellow", borderColor: "yellow" }}>
          <DeleteOutlined />
        </Button>
      </Popconfirm>
    </div>
  );
};

export default TeacherDeleteRequest;
