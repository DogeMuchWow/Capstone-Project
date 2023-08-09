import TeacherViewAllRequest from "./TeacherViewAllRequest";
import Footer from "../../layout/Footer";

const TeacherRequestMain = () => {
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
                      <li class="breadcrumb-item">Teacher</li>
                      <li class="breadcrumb-item active" aria-current="page">
                        Request
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="pd-20 card-box mb-30">
              <TeacherViewAllRequest />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default TeacherRequestMain;
