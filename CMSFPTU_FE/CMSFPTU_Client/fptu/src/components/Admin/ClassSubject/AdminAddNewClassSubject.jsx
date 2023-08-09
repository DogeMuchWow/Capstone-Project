import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import { Button, Modal, message, AutoComplete, Form, DatePicker } from "antd";
import { subDays } from "date-fns";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const AdminAddNewClassSubject = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const ADD_ACCOUNT_SUBJECT_URL = "/ClassSubject/create";
  const [subjectInput, setSubjectInput] = useState("");
  const [subjectSelected, setSubjectSelected] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [classInput, setClassInput] = useState("");
  const [classSelected, setClassSelected] = useState("");
  const [classData, setClassData] = useState([]);
  const [dateSelect, setDateSelect] = useState([]);

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

  useEffect(() => {
    async function getAllClass() {
      try {
        const response = await axios.get("/Class");
        setClassData(response.data);
      } catch (error) {
        message.error("Can not get class");
      }
    }
    getAllClass();
  }, []);

  const handleSubjectChange = (data, option) => {
    setSubjectInput(data);
    setSubjectSelected(option);
  };

  const handleSubjectSelect = (data, option) => {
    form.setFieldsValue({ subjectLabel: option?.label });
    setSubjectInput(option?.label);
    setSubjectSelected(option);
  };

  const handleClassChange = (data, option) => {
    setClassInput(data);
    setClassSelected(option);
  };

  const handleClassSelect = (data, option) => {
    form.setFieldsValue({ classLabel: option?.label });
    setClassInput(option?.label);
    setClassSelected(option);
  };

  const showAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCancel = () => {
    setClassInput("");
    setSubjectInput("");
    setSubjectSelected("");
    setClassSelected("");
    dispatch(
      reloading({
        reloading: false,
      })
    );
    setAddModalOpen(false);
    form.resetFields();
  };

  const handleAddOk = async (e) => {
    try {
      const response = await axios.post(
        ADD_ACCOUNT_SUBJECT_URL,
        {
          classId: classSelected?.value,
          subjectId: subjectSelected?.value,
          startDate: dateSelect[0]?._d,
          endDate: dateSelect[1]?._d,
        },
        {
          header: { "content-type": "application/json" },
        }
      );
      if (response?.data?.status === true) {
        message.success(response?.data?.message);
      } else {
        message.error(response?.data?.message);
      }
      setClassInput("");
      setSubjectInput("");
      setSubjectSelected("");
      setClassSelected("");
      dispatch(
        reloading({
          reloading: true,
        })
      );
      form.resetFields();
    } catch (error) {
      form.resetFields();
      message.error("Add fail!");
      console.log(error);
      dispatch(
        reloading({
          reloading: false,
        })
      );
      setClassInput("");
      setSubjectInput("");
      setSubjectSelected("");
      setClassSelected("");
    }
    setAddModalOpen(false);
  };

  const subjectOptions = subjectData.map(function (row) {
    return { value: row?.subjectId, label: row?.subjectCode };
  });
  const classOptions = classData.map(function (row) {
    return { value: row?.classId, label: row?.classCode };
  });

  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <Button type="primary" onClick={showAddModal}>
          <PlusOutlined /> Add Subject to Class
        </Button>
      </div>
      <Modal
        title="Add new class subject"
        open={isAddModalOpen}
        onCancel={handleCancel}
        closable
        footer={[]}
      >
        <Form onFinish={handleAddOk} form={form} layout="vertical">
          <div className="mb-3">
            <Form.Item
              name="classLabel"
              label="Class code"
              rules={[
                { required: true, message: "Please enter class code" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("classLabel") === classSelected?.label
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("This class does not exist")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <AutoComplete
                defaultActiveFirstOption
                placeholder="Class code"
                style={{
                  width: "100%",
                }}
                filterOption={(classInput, option) =>
                  option.label
                    .toUpperCase()
                    .indexOf(classInput.toUpperCase()) !== -1
                }
                onChange={handleClassChange}
                onSelect={handleClassSelect}
                options={classOptions}
              ></AutoComplete>
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              name="subjectLabel"
              label="Subject code"
              rules={[
                { required: true, message: "Please enter subject code" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("subjectLabel") === subjectSelected?.label
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
              label="Start Date - End Date"
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
                format="DD/MM/YYYY"
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

export default AdminAddNewClassSubject;
