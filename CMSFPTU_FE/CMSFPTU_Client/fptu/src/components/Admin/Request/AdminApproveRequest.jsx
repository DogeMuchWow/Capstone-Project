import axios from "../../../api/axios";
import { Button, Popconfirm, message } from "antd";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const AdminApproveRequest = (props) => {
  const dispatch = useDispatch();

  const handleApprove = async () => {
    try {
      await axios.post(props.url);
      message.success("Approve request");
      dispatch(
        reloading({
          reloading: true,
        })
      );
    } catch (error) {
      message.error("Approve request failed");
      console.log(error);
      dispatch(
        reloading({
          reloading: false,
        })
      );
    }
  };

  const cancel = () => {
    message.error("Cancel approve");
    dispatch(
      reloading({
        reloading: false,
      })
    );
  };
  return (
    <div>
      <Popconfirm
        title="Approve the request?"
        onConfirm={handleApprove}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" shape="round" size="medium">
          APPROVE
        </Button>
      </Popconfirm>
    </div>
  );
};

export default AdminApproveRequest;
