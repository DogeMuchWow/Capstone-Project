import axios from "../../../api/axios";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  message,
  AutoComplete,
  Form,
  Input,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const AddNewAccount = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [accountCode, setAccountCode] = useState("");
  const [passwordHash, setPass] = useState("");
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [gender, setGender] = useState(true);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setroleId] = useState("2");

  const [classInput, setClassInput] = useState("");
  const [classSelected, setClassSelected] = useState("");
  const [classData, setClassData] = useState([]);

  //class
  useEffect(() => {
    async function getAllClass() {
      try {
        const response = await axios.get("/Class");
        setClassData(response.data);
      } catch (error) {}
    }
    getAllClass();
  }, []);
  const handleClassChange = (data, option) => {
    setClassInput(data);
    setClassSelected(option);
  };
  const handleClassSelect = (data, option) => {
    form.setFieldsValue({ classLabel: option.label });
    setClassInput(option.label);
    setClassSelected(option);
  };
  const classOptions = classData.map(function (row) {
    return { value: row?.classId, label: row?.classCode };
  });

  const showAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCancel = () => {
    dispatch(
      reloading({
        reloading: false,
      })
    );
    form.resetFields();
    setAddModalOpen(false);
    setAccountCode("");
    setPass("");
    setfirstName("");
    setlastName("");
    setGender(true);
    setPhone("");
    setEmail("");
    setroleId("2");
    setClassInput("");
    setClassSelected("");
  };

  const handleAddOk = async (e) => {
    try {
      const response = await axios.post(
        props?.url,
        {
          accountCode: accountCode,
          passwordHash: passwordHash,
          firstname: firstname,
          lastname: lastname,
          gender: gender,
          phone: phone,
          email: email,
          roleId: roleId,
          classId: classSelected.value,
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

      setAccountCode("");
      setPass("");
      setfirstName("");
      setlastName("");
      setGender(true);
      setPhone("");
      setEmail("");
      setroleId("2");
      setClassInput("");
      setClassSelected("");
      dispatch(
        reloading({
          reloading: true,
        })
      );
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error("Add failed");
      dispatch(
        reloading({
          reloading: false,
        })
      );
      setAccountCode("");
      setPass("");
      setfirstName("");
      setlastName("");
      setGender(true);
      setPhone("");
      setEmail("");
      setroleId("2");
      setClassInput("");
      setClassSelected("");
      form.resetFields();
    }
    setAddModalOpen(false);
  };
  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <Button type="primary" onClick={showAddModal}>
          <PlusOutlined /> New account
        </Button>
      </div>
      <Modal
        title="Add Account"
        open={isAddModalOpen}
        onCancel={handleCancel}
        onOk={form.submit}
        closable
        footer={[]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddOk}
          autoComplete="off"
        >
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <Form.Item
                  name="accountCode"
                  label="Account Code"
                  rules={[
                    { required: true, message: "Please enter account code" },
                    { whitespace: true },
                    {
                      min: 3,
                      message: "Account code must have more than 3 character",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="Account Code"
                    onChange={(e) => setAccountCode(e.target.value)}
                  ></Input>
                </Form.Item>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <Form.Item
                  name="passwordHash"
                  label="Password"
                  rules={[{ required: true, message: "Password is required" }]}
                  hasFeedback
                >
                  <Input.Password
                    placeholder="Password"
                    onChange={(e) => setPass(e.target.value)}
                  ></Input.Password>
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <Form.Item
                  name="firstname"
                  label="First name"
                  rules={[
                    { required: true, message: "Please enter first name" },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="First name"
                    onChange={(e) => setfirstName(e.target.value)}
                  ></Input>
                </Form.Item>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <Form.Item
                  name="lastname"
                  label="Last name"
                  rules={[
                    { required: true, message: "Please enter last name" },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="Last name"
                    onChange={(e) => setlastName(e.target.value)}
                  ></Input>
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true, message: "Please select gender" }]}
                >
                  <Select
                    placeholder="Select gender"
                    value={gender}
                    onChange={(value) => {
                      setGender(value);
                    }}
                  >
                    <Select.Option value={true}>Male</Select.Option>
                    <Select.Option value={false}>Female</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true, message: "Please select role" }]}
                >
                  <Select
                    placeholder="Select role"
                    value={roleId}
                    onChange={(value) => setroleId(value)}
                  >
                    <Select.Option value="2">Admin</Select.Option>
                    <Select.Option value="3">Teacher</Select.Option>
                    <Select.Option value="4">Student</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                { required: true, message: "Phone enter phone number" },
                { pattern: "[0-9]", message: "Phone must be number" },
                { min: 10, max: 10, message: "Phone number must be 10 digits" },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
              ></Input>
            </Form.Item>
          </div>
          <div className="mb-3">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </Form.Item>
          </div>

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
                placeholder="Input Class Code"
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
          <div className="col text-right">
            <div className="btn-group">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AddNewAccount;
