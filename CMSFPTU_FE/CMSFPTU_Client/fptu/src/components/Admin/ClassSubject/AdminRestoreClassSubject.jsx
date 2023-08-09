import axios from "../../../api/axios";
import { Button, Popconfirm, message } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const AdminRestoreClassSubject = (props) => {
  const dispatch = useDispatch();
  const handleRestore = async () => {
    try {
      await axios.post(props?.url);
      message.success("Restore successfully!");
      dispatch(
        reloading({
          reloading: true,
        })
      );
    } catch (error) {
      message.error("Restore failed!");
      console.log(error);
      dispatch(
        reloading({
          reloading: false,
        })
      );
    }
  };

  const cancel = () => {
    message.error("Cancel restore");
    dispatch(
      reloading({
        reloading: false,
      })
    );
  };
  return (
    <div>
      <Popconfirm
        title="Are you sure to restore this account subject?"
        onConfirm={handleRestore}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button style={{ background: "yellow", borderColor: "yellow" }}>
          <RollbackOutlined />
        </Button>
      </Popconfirm>
    </div>
  );
};

export default AdminRestoreClassSubject;
