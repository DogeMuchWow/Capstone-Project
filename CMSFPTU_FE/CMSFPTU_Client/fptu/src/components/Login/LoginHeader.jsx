import { Link } from "react-router-dom";

export default function LoginHeader() {
  return (
    <div>
      <div className="login-header box-shadow">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="brand-logo">
            <Link to="/login">
              <img src="vendors/images/FPTU_logo_1.png" alt="" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
