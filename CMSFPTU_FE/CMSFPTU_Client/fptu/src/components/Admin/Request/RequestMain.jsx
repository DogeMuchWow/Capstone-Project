import Footer from "../../layout/Footer";
import ViewAllRequest from "./ViewAllRequest";

export default function RequestMain(props) {
  const VIEW_REQUEST_URL = "/RequestTeacher/get-request-from-teacher";
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
                      <li class="breadcrumb-item active" aria-current="page">
                        Request List
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="pd-20 card-box mb-30">
              <ViewAllRequest url={VIEW_REQUEST_URL} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
