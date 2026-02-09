import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { BeatLoader } from "react-spinners";

const Login = lazy(() => import("../pages/login"));
const VendorSignUp = lazy(() => import("../pages/vendor-signup"));

const AuthRoutes = () => {
  // TODO -> Move endpoints to constant file
  return (
    <Suspense fallback={<BeatLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<VendorSignUp />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
