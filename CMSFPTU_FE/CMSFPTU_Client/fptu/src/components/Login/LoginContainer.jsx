import LoginBox from "./LoginBox";

export default function LoginContainer() {
  return (
    <div>
      <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-lg-7">
              <img
                src="vendors/images/FPTU.jpeg"
                alt=""
                className="img-responsive"
              />
            </div>
            <div className="col-md-6 col-lg-5">
              <LoginBox></LoginBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
