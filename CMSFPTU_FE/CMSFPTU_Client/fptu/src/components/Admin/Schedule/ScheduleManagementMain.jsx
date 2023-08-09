import React from "react";
import ViewAllSchedule from "./ViewAllSchedule";
import Footer from "../../layout/Footer";

const ScheduleManagementMain = () => {
  const VIEW_ALL_SCHEDULE = "/Schedule/get-for-admin";
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
                      <li class="breadcrumb-item">Management</li>
                      <li class="breadcrumb-item active" aria-current="page">
                        Schedule
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="pd-20 card-box mb-30">
              <ViewAllSchedule url={VIEW_ALL_SCHEDULE} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagementMain;
