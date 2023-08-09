import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = ({ allowRoles }) => {
  let location = useLocation();
  const token = useSelector((state) => state.user.token);
  const roleId = useSelector((state) => state.user.roleId);
  return allowRoles.includes(roleId) && token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
