import LoginForm from "./LoginForm";

export default function LoginBox() {
  return (
    <div className="login-box bg-white box-shadow border-radius-10">
      <div className="login-title">
        <h2 className="text-center text-primary">Login To CMSFPTU</h2>
      </div>
      <LoginForm></LoginForm>
    </div>
  );
}
