import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { Button, Modal, message, AutoComplete, Form, DatePicker } from "antd";
import { format, subDays } from "date-fns";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";
import moment from "moment";

const AdminEditClassSubject = (props) => {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [subjectInput, setSubjectInput] = useState("");
  const [subjectSelected, setSubjectSelected] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [dateSelect, setDateSelect] = useState([]);
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setText({
      datePicker: [
        moment(props?.data?.startDate),
        moment(props?.data?.endDate),
      ],
    });
    const currentSubjectData = {
      label: props?.data?.subject?.subjectCode,
      value: props?.data?.subject?.subjectId,
    };
    setDateSelect(text?.datePicker);
    form.setFieldsValue({
      subjectCode: props?.data?.subject?.subjectCode,
      date: text?.datePicker,
    });
    setSubjectSelected(currentSubjectData);
  }, [props, isModalOpen]);

  useEffect(() => {
    async function getAllSubject() {
      try {
        const response = await axios.get("/Subject");
        setSubjectData(response.data);
      } catch (error) {
        message.error("Can not get subject");
      }
    }
    getAllSubject();
  }, []);

  //date
  const disabledDate = (current) => {
    return current.isSameOrBefore(subDays(new Date(), 1));
  };

  const handleSubjectChange = (data, option) => {
    setSubjectInput(data);
    setSubjectSelected(option);
  };

  const handleSubjectSelect = (data, option) => {
    form.setFieldsValue({ subjectCode: option?.label });
    setSubjectInput(option.label);
    setSubjectSelected(option);
  };

  const showEditModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    dispatch(
      reloading({
        reloading: false,
      })
    );
    setSubjectInput("");
    setSubjectSelected("");
    setModalOpen(false);
    form.resetFields();
  };

  const handleEditOk = async (e) => {
    try {
      const response = await axios.put(
        props.url,
        {
          subjectId: subjectSelected.value,
          startDate: dateSelect[0]?._d,
          endDate: dateSelect[1]?._d,
        },
        {
          header: { "content-type": "application/json" },
        }
      );
      setSubjectInput("");
      setSubjectSelected("");
      dispatch(
        reloading({
          reloading: true,
        })
      );
      if (response?.data?.status === true) {
        message.success(response?.data?.message);
      } else {
        message.error(response?.data?.message);
      }
      form.resetFields();
    } catch (error) {
      form.resetFields();
      message.error("Class subject edit fail");
      console.log(error);
      setSubjectInput("");
      setSubjectSelected("");
      dispatch(
        reloading({
          reloading: false,
        })
      );
    }
    setModalOpen(false);
  };

  const subjectOptions = subjectData.map(function (row) {
    return { value: row?.subjectId, label: row?.subjectCode };
  });

  return (
    <div>
      <Button
        type="danger"
        className="mr-2"
        onClick={() => {
          showEditModal();
        }}
      >
        <EditOutlined />
      </Button>
      <Modal
        title={"Edit Subject of class " + props?.data?.classCode}
        open={isModalOpen}
        onOk={handleEditOk}
        onCancel={handleCancel}
        closable
        footer={[]}
      >
        <Form onFinish={handleEditOk} form={form} layout="vertical">
          <div className="mb-3">
            <Form.Item
              name="subjectCode"
              label="Subject Code"
              rules={[
                { required: true, message: "Please enter subject code" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("subjectCode") === subjectSelected?.label
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("This subject does not exist")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <AutoComplete
                defaultActiveFirstOption
                placeholder="Subject Code"
                style={{
                  width: "100%",
                }}
                filterOption={(subjectInput, option) =>
                  option.label
                    .toUpperCase()
                    .indexOf(subjectInput.toUpperCase()) !== -1
                }
                onChange={handleSubjectChange}
                onSelect={handleSubjectSelect}
                options={subjectOptions}
              ></AutoComplete>
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              name="date"
              label="Start Date => End Date"
              rules={[
                {
                  required: true,
                  message: "Please select start date and end date",
                },
              ]}
              hasFeedback
            >
              <RangePicker
                style={{
                  width: "100%",
                }}
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
                onChange={(date) => {
                  setDateSelect(date);
                }}
              ></RangePicker>
            </Form.Item>
          </div>
          <div className="col text-right">
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminEditClassSubject;
