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
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { reloading } from "../../../features/pageSlice";

const EditAccountData = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalOpen, setModalOpen] = useState(false);
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

  useEffect(() => {
    const currentClassData = {
      label: props?.data?.class?.classCode,
      value: props?.data?.class?.classId,
    };
    form.setFieldsValue({
      accountCode: props?.data?.accountCode,
      passwordHash: props?.data?.passwordHash,
      firstname: props?.data?.firstname,
      lastname: props?.data?.lastname,
      gender: props?.data?.gender,
      role: props?.data?.role?.roleId,
      phone: props?.data?.phone,
      email: props?.data?.email,
      classLabel: props?.data?.class?.classCode,
    });
    setAccountCode(props?.data?.accountCode);
    setfirstName(props?.data?.firstname);
    setlastName(props?.data?.lastname);
    setGender(props?.data?.gender);
    setroleId(props?.data?.role?.roleId);
    setPhone(props?.data?.phone);
    setEmail(props?.data?.email);
    setClassSelected(currentClassData);
  }, [props, isModalOpen]);

  //class
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

  const showEditModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
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
    setModalOpen(false);
    form.resetFields();
  };

  const handleEditOk = async (e) => {
    try {
      const response = await axios.put(
        props.url,
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
      if (response?.data?.status === true) {
        message.success(response?.data?.message);
      } else {
        message.error(response?.data?.message);
      }
      form.resetFields();
    } catch (error) {
      console.log(error);
      message.error("Edit fail!");
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
          reloading: false,
        })
      );
      form.resetFields();
    }
    setModalOpen(false);
  };

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
        title="Edit Account"
        open={isModalOpen}
        onOk={handleEditOk}
        onCancel={handleCancel}
        closable
        footer={[]}
      >
        <Form
          onFinish={handleEditOk}
          form={form}
          layout="vertical"
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
                  rules={[{ required: true }]}
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
                  rules={[{ required: true }]}
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
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select gender"
                    value={gender}
                    onChange={(value) => setGender(value)}
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
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select role"
                    value={roleId}
                    onChange={(value) => setroleId(value)}
                  >
                    <Select.Option value={2}>Admin</Select.Option>
                    <Select.Option value={3}>Teacher</Select.Option>
                    <Select.Option value={4}>Student</Select.Option>
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

export default EditAccountData;
