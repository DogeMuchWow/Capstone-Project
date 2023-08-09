import Footer from "../../layout/Footer";
import StudentViewCalendar from "./StudentViewCalendar";
import { useSelector } from "react-redux";

const StudentCalendarMain = () => {
  const accountId = useSelector((state) => state.user.accountID);
  const VIEW_CALENDAR_URL = "/Schedule?accountId=" + accountId;
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
                      <li class="breadcrumb-item">Student</li>
                      <li class="breadcrumb-item active" aria-current="page">
                        Calendar
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="pd-20 card-box mb-30">
              <StudentViewCalendar url={VIEW_CALENDAR_URL} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default StudentCalendarMain;
