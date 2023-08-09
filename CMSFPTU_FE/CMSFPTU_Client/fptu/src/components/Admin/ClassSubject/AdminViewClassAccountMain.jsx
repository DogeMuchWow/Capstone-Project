import Footer from "../../layout/Footer";
import AdminViewClassAccount from "./AdminViewClassAccount";

const AdminViewClassAccountMain = (props) => {
  const VIEW_CLASS_ACCOUNT =
    "/ClassSubject/get-accounts?classId=" + props.classId;
  return (
    <div>
      <div className="main-container">
        <div class="page-header">
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <nav aria-label="breadcrumb" role="navigation">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">Management</li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Class Account
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <AdminViewClassAccount url={VIEW_CLASS_ACCOUNT} />
        <Footer />
      </div>
    </div>
  );
};

export default AdminViewClassAccountMain;
