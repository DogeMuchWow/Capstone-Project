import Footer from "../../layout/Footer";
import ViewAllRoom from "./ViewAllRoom";
import AddNewRoomModal from "./AddNewRoomModal";

const RoomTable = (props) => {
  const ROOM_URL = "/Room";
  const ROOM_CREATE_URL = "/Room/create";
  const ROOM_DELETED_URL = "/Room/get-deleted";
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
                        Room
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="pd-20 card-box mb-30">
              {props?.deleted === false ? (
                <AddNewRoomModal url={ROOM_CREATE_URL} />
              ) : (
                ""
              )}
              {props?.deleted === true ? (
                <ViewAllRoom url={ROOM_DELETED_URL} deleted={deleted} />
              ) : (
                <ViewAllRoom url={ROOM_URL} deleted={deleted} />
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RoomTable;
