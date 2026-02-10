import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { BeatLoader } from "react-spinners";
import { ROUTES } from "../constants/RoutesConst.js";
const Login = lazy(() => import("../pages/login"));
const VendorSignUp = lazy(() => import("../pages/vendor-signup"));

const AuthRoutes = () => {
  // TODO -> Move endpoints to constant file
  return (
    <Suspense fallback={<BeatLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<VendorSignUp />} />
        <Route
          path={ROUTES.NOT_FOUND}
          element={<Navigate to={ROUTES.LOGIN} replace />}
        />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
