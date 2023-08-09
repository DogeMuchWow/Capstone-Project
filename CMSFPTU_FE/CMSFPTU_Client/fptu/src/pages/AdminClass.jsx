import ViewClassTable from "../components/Admin/Class/ViewClassTable";

import React from "react";

const AdminClass = (props) => {
  return (
    <div>
      <ViewClassTable deleted={props?.deleted} />
    </div>
  );
};

export default AdminClass;
