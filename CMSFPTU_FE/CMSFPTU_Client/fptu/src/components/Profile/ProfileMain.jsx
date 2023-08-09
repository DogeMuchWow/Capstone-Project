import axios from "../../api/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const ProfileMain = () => {
  const [userData, setUserData] = useState("");
  const accountId = useSelector((state) => state.user.accountID);

  function getFormattedDate(date) {
    if (date != null) {
      const d = new Date(date);
      var year = d.getFullYear();
      var month = (1 + d.getMonth()).toString();
      month = month.length > 1 ? month : "0" + month;
      var day = d.getDate().toString();
      day = day.length > 1 ? day : "0" + day;
      return day + "/" + month + "/" + year;
    }
  }

  useEffect(() => {
    async function getAccount() {
      try {
        const response = await axios.get(
          "/Account/get-account?id=" + accountId
        );
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAccount();
  }, []);
  return (
    <div>
      <div className="main-container">
        <div className="pd-ltr-20 xs-pd-20-10">
          <div className="min-height-200px">
            <div class="page-header">
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="title">
                    <h4>Profile</h4>
                  </div>
                  <nav aria-label="breadcrumb" role="navigation">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        {userData?.body?.role?.roleId === "2" ? (
                          <Link to="/admin/request">
                            <a>Home</a>
                          </Link>
                        ) : userData?.body?.role?.roleId === "3" ? (
                          <Link to="/teacher/request">
                            <a>Home</a>
                          </Link>
                        ) : (
                          <Link to="/student">
                            <a>Home</a>
                          </Link>
                        )}
                      </li>
                      <li class="breadcrumb-item active" aria-current="page">
                        Profile
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="pd-20 card-box height-100-p">
              <div class="profile-info">
                <h5 class="mb-20 h5 text-blue">User Information</h5>
                <ul>
                  <li>
                    <span>Account Code:</span>
                    {userData?.body?.accountCode}
                  </li>
                  <li>
                    <span>First Name:</span>
                    {userData?.body?.firstname}
                  </li>
                  <li>
                    <span>Last Name:</span>
                    {userData?.body?.lastname}
                  </li>
                  <li>
                    <span>Gender:</span>
                    {userData?.body?.gender ? "Male" : "Female"}
                  </li>
                  <li>
                    <span>Email:</span>
                    {userData?.body?.email}
                  </li>
                  <li>
                    <span>Class:</span>
                    {userData?.body?.class?.classCode}
                  </li>
                  <li>
                    <span>Phone Number:</span>
                    {userData?.body?.phone}
                  </li>
                  <li>
                    <span>Role:</span>
                    {userData?.body?.role?.roleCode}
                  </li>
                  <li>
                    <span>Created at:</span>
                    {getFormattedDate(userData?.body?.createdAt)}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
