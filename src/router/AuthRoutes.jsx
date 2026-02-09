import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import VendorSignUp from "../pages/vendor-signup";
import { Navigate } from "react-router-dom";
const AuthRoutes = () => {
  //TODO-> Move endpoints to constant file
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<VendorSignUp />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
