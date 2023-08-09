import { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/userSlice";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export default function LoginForm() {
  const LOGIN_URL = "/Authentication/authenticate";
  const AccountRef = useRef();
  const navigate = useNavigate();
  const [accCode, setAccCode] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRemember] = useState(false);
  const token = useSelector((state) => state.user.token);
  const rId = useSelector((state) => state.user.roleId);

  const dispatch = useDispatch();

  useEffect(() => {
    AccountRef.current.focus();
  }, []);

  useEffect(() => {
    if (token && rId === "2") {
      navigate("/admin/request");
    } else if (token && rId === "3") {
      navigate("/teacher/request");
    } else if (token && rId === "4") {
      navigate("/student/calendar");
    } else {
      navigate("/login");
    }
  }, [token, rId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          accountCode: accCode,
          password: password,
          rememberMe: rememberMe,
        },
        {
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.body?.token;
      const decodeToken = jwt(accessToken);
      const roleId = decodeToken?.roleId;
      const isLoggedIn = true;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("roleId", decodeToken?.roleId);
      localStorage.setItem("accountID", decodeToken?.accountId);
      localStorage.setItem("accountCode", accCode);
      localStorage.setItem("loggedIn", isLoggedIn);

      dispatch(
        login({
          accountID: decodeToken?.accountId,
          accountCode: accCode,
          roleId: decodeToken?.roleId,
          token: accessToken,
          loggedIn: isLoggedIn,
        })
      );

      setAccCode("");
      setPassword("");
      setRemember(false);
      //TODO: seperate into function
      if (accessToken && isLoggedIn && roleId === "2") {
        navigate("/admin/request");
      } else if (accessToken && isLoggedIn && roleId === "3") {
        navigate("/teacher/request");
      } else if (accessToken && isLoggedIn && roleId === "4") {
        navigate("/student");
      } else {
        navigate("/login");
      }
      message.success("Login success");
    } catch (error) {
      if (!error?.message) {
        message.error("No Server Response");
      } else {
        message.error("Login fail");
        setAccCode("");
        setPassword("");
        setRemember(false);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="input-group custom">
          <input
            ref={AccountRef}
            type="text"
            id="accountCode"
            className="form-control form-control-lg"
            placeholder="Account Code"
            autoComplete="off"
            onChange={(e) => setAccCode(e.target.value)}
            value={accCode}
            required={true}
          />
          <div className="input-group-append custom">
            <span className="input-group-text">
              <i className="icon-copy dw dw-user1"></i>
            </span>
          </div>
        </div>
        <div className="input-group custom">
          <input
            type="password"
            id="password"
            className="form-control form-control-lg"
            placeholder="**********"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <div className="input-group-append custom">
            <span className="input-group-text">
              <i className="dw dw-padlock1"></i>
            </span>
          </div>
        </div>
        <div className="row pb-30">
          <div className="col-6">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" for="customCheck1">
                Remember
              </label>
            </div>
          </div>
          <div className="col-6">
            <div className="forgot-password">
              <a href="forgot-password.html">Forgot Password</a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="input-group mb-0">
              <input
                className="btn btn-primary btn-lg btn-block"
                type="submit"
                value="Sign In"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
