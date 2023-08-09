import Footer from "../../layout/Footer";
import ViewAllClass from "./ViewAllClass";
import AddNewClass from "./AddNewClass";

const ViewClassTable = (props) => {
  const CLASS_URL = "/Class";
  const CLASS_DELETED_URL = "/Class/get-deleted";
  const deleted = props?.deleted;
  return (
    <div>
      <div className="main-container">
        <div className="pd-ltr-20 xs-pd-20-10">
          <div className="min-height-200px">
            <div className="page-header">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <nav aria-label="breadcrumb" role="navigation">
                    <ol className="breadcrumb">
                      {props?.deleted === false ? (
                        <li className="breadcrumb-item">Management</li>
                      ) : (
                        <li className="breadcrumb-item">Deleted Management</li>
                      )}
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Class
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="pd-20 card-box mb-30">
              {props?.deleted === false ? <AddNewClass /> : ""}
              {props?.deleted === true ? (
                <ViewAllClass url={CLASS_DELETED_URL} deleted={deleted} />
              ) : (
                <ViewAllClass url={CLASS_URL} deleted={deleted} />
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ViewClassTable;
