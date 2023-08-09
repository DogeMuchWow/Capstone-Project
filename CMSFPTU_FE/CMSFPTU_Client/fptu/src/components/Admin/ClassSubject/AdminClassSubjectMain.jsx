import Footer from "../../layout/Footer";
import AdminViewClassSubject from "./AdminViewClassSubject";

const AdminClassSubjectMain = (props) => {
  const CLASS_SUBJECT_URL = "/ClassSubject";
  const CLASS_SUBJECT_DELETED_URL = "/ClassSubject/get-deleted";
  const deleted = props?.deleted;
  return (
    <div>
      <div className="main-container">
        <div className="pd-ltr-20 xs-pd-20-10">
          <div className="min-height-200px">
            <div class="page-header">
              <div class="row">
                <div class="col-md-6 col-sm-12">
                  <nav aria-label="breadcrumb" role="navigation">
                    <ol class="breadcrumb">
                      {props?.deleted === false ? (
                        <li class="breadcrumb-item">Management</li>
                      ) : (
                        <li class="breadcrumb-item">Deleted Management</li>
                      )}
                      <li class="breadcrumb-item active" aria-current="page">
                        Class Subject
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="pd-20 card-box mb-30">
              {props?.deleted === true ? (
                <AdminViewClassSubject
                  url={CLASS_SUBJECT_DELETED_URL}
                  deleted={deleted}
                />
              ) : (
                <AdminViewClassSubject
                  url={CLASS_SUBJECT_URL}
                  deleted={deleted}
                />
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminClassSubjectMain;
