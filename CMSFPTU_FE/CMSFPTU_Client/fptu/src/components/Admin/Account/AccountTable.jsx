import Footer from "../../layout/Footer";
import ViewAllAccount from "./ViewAllAccount";
import AddNewAccount from "./AddNewAccount";

export default function AccountTable(props) {
  const ACCOUNT_VIEW = "/Account";
  const ACCOUNT_CREATE_URL = "/Account/create";
  const DELETED_ACCOUNT_VIEW_URL = "/Account/get-deleted";
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
                        Account
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="pd-20 card-box mb-30">
              {props?.deleted === false ? (
                <AddNewAccount url={ACCOUNT_CREATE_URL} />
              ) : (
                ""
              )}
              {props?.deleted === true ? (
                <ViewAllAccount
                  url={DELETED_ACCOUNT_VIEW_URL}
                  deleted={deleted}
                />
              ) : (
                <ViewAllAccount url={ACCOUNT_VIEW} deleted={deleted} />
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
