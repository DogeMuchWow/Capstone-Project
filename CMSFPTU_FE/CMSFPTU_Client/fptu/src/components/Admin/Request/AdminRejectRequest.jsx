import axios from "../../../api/axios";
import { Button, Popconfirm, message } from "antd";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const AdminRejectRequest = (props) => {
  const dispatch = useDispatch();

  const handleReject = async () => {
    try {
      await axios.post(props.url);
      message.success("Reject request");
      dispatch(
        reloading({
          reloading: true,
        })
      );
    } catch (error) {
      message.error("Reject request failed!");
      console.log(error);
      dispatch(
        reloading({
          reloading: false,
        })
      );
    }
  };

  const cancel = () => {
    message.error("Cancel reject");
    dispatch(
      reloading({
        reloading: false,
      })
    );
  };
  return (
    <div>
      <Popconfirm
        title="Reject the request?"
        onConfirm={handleReject}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" shape="round" size="medium" danger>
          REJECT
        </Button>
      </Popconfirm>
    </div>
  );
};

export default AdminRejectRequest;
