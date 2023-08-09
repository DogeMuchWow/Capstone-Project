import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/userSlice";

export default function Header() {
  const dispatch = useDispatch();
  const accountCode = useSelector((state) => state.user.accountCode);
  const role = useSelector((state) => state.user.roleId);
  return (
    <div>
      {role ? (
        <div className="header">
          <div className="header-left">
            <div className="menu-icon dw dw-menu"></div>
            <div
              className="search-toggle-icon dw dw-search2"
              data-toggle="header_search"
            ></div>
            <div className="header-search">
              <form>
                <div className="form-group mb-0">
                  <div className="dropdown">
                    <div className="dropdown-menu dropdown-menu-right">
                      <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">
                          From
                        </label>
                        <div className="col-sm-12 col-md-10">
                          <input
                            className="form-control form-control-sm form-control-line"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">
                          To
                        </label>
                        <div className="col-sm-12 col-md-10">
                          <input
                            className="form-control form-control-sm form-control-line"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-12 col-md-2 col-form-label">
                          Subject
                        </label>
                        <div className="col-sm-12 col-md-10">
                          <input
                            className="form-control form-control-sm form-control-line"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="header-right">
            <div className="user-info-dropdown">
              <div className="dropdown">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                >
                  <span className="user-icon">
                    {role === "2" ? (
                      <img src="http://localhost:3000/vendors/images/admin_logo.png"></img>
                    ) : role === "3" ? (
                      <img src="http://localhost:3000/vendors/images/teacher_logo.png"></img>
                    ) : (
                      <img src="http://localhost:3000/vendors/images/student_logo.png"></img>
                    )}
                  </span>
                  <span className="user-name">{accountCode}</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                  {role === "2" ? (
                    <Link to="/admin/profile">
                      <a className="dropdown-item">
                        <i className="dw dw-user1"></i> Profile
                      </a>
                    </Link>
                  ) : role === "3" ? (
                    <Link to="/teacher/profile">
                      <a className="dropdown-item">
                        <i className="dw dw-user1"></i> Profile
                      </a>
                    </Link>
                  ) : (
                    <Link to="/student/profile">
                      <a className="dropdown-item">
                        <i className="dw dw-user1"></i> Profile
                      </a>
                    </Link>
                  )}

                  <Link to="/login">
                    <a
                      className="dropdown-item"
                      onClick={() => dispatch(logout())}
                    >
                      <i className="dw dw-logout"></i>
                      Log Out
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
