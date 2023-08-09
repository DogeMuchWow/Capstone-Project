import Footer from "../../layout/Footer";
import ViewAllRoomType from "./ViewAllRoomType";
import AddNewRoomTypeModal from "./AddNewRoomTypeModal";

const RoomTypeTable = (props) => {
  const ROOMTYPE_URL = "/RoomType";
  const DELETED_ROOMTYPE_URL = "/RoomType/get-deleted";
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
                        Room Type
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="pd-20 card-box mb-30">
              {props?.deleted === false ? <AddNewRoomTypeModal /> : ""}
              {props?.deleted === true ? (
                <ViewAllRoomType url={DELETED_ROOMTYPE_URL} deleted={deleted} />
              ) : (
                <ViewAllRoomType url={ROOMTYPE_URL} deleted={deleted} />
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RoomTypeTable;
