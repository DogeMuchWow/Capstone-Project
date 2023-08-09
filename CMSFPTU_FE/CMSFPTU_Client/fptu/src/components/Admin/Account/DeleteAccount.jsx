import axios from "../../../api/axios";
import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const DeleteAccount = (props) => {
  const dispatch = useDispatch();
  const handleDelete = async (e) => {
    try {
      await axios.delete(props?.url);
      message.success("Account deleted successfully");
      dispatch(
        reloading({
          reloading: true,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        reloading({
          reloading: false,
        })
      );
      message.error("Delete failed");
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
      <div>
        <Popconfirm
          title="Are you sure to delete this account?"
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
    </div>
  );
};

export default DeleteAccount;
