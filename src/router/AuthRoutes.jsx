import { Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { BeatLoader } from "react-spinners";
import { ROUTES } from "../constants/RoutesConst.js";

const Login = lazy(() => import("../pages/login"));
const VendorSignUp = lazy(() => import("../pages/vendor-signup"));
const AdminSignUp = lazy(() => import("../pages/admin-signup"));
const ForgotPassword = lazy(() => import("../pages/forgot-password"));
const ResetPassword = lazy(() => import("../pages/reset-password"));

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route
        path={ROUTES.LOGIN}
        element={
          <Suspense fallback={<BeatLoader />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.SIGNUP}
        element={
          <Suspense fallback={<BeatLoader />}>
            <VendorSignUp />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.REGISTER_ADMIN}
        element={
          <Suspense fallback={<BeatLoader />}>
            <AdminSignUp />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.FORGOT_PASSWORD}
        element={
          <Suspense fallback={<BeatLoader />}>
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.RESET_PASSWORD}
        element={
          <Suspense fallback={<BeatLoader />}>
            <ResetPassword />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.NOT_FOUND}
        element={<Navigate to={ROUTES.LOGIN} replace />}
      />
    </Routes>
  );
};

export default AuthRoutes;
