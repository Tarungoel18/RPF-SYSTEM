import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import AppLayoutAdmin from "../layout/admin/AppLayoutAdmin";
import AppLayoutVendor from "../layout/vendor/AppLayoutVendor";
import { BeatLoader } from "react-spinners";
import { ROLE } from "../constants/AppConst";
import { ROUTES } from "../constants/RoutesConst.js";

const AdminDashboard = lazy(() => import("../pages/admin-dashboard"));
const VendorDashboard = lazy(() => import("../pages/vendor-dashboard"));
const Categories = lazy(() => import("../pages/categories"));
const AddCategory = lazy(() => import("../pages/add-category"));
const VendorsList = lazy(() => import("../pages/vendors-list"));
const RfpList = lazy(() => import("../pages/rfp-list"));
const RpfQuotes = lazy(() => import("../pages/rpf-quotes"));
const AddRfp = lazy(() => import("../pages/add-rfp"));
const RfpForQuotes = lazy(() => import("../pages/rfp-for-quotes"));
const ApplyRfp = lazy(() => import("../pages/apply-rfp"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={[ROLE.ADMIN]} />}>
        <Route element={<AppLayoutAdmin />}>
          <Route
            path={ROUTES.ADMIN_DASHBOARD}
            element={
              <Suspense fallback={<BeatLoader />}>
                <AdminDashboard />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.CATEGORIES}
            element={
              <Suspense fallback={<BeatLoader />}>
                <Categories />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.ADD_CATEGORY}
            element={
              <Suspense fallback={<BeatLoader />}>
                <AddCategory />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.VENDORS_LIST}
            element={
              <Suspense fallback={<BeatLoader />}>
                <VendorsList />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.RFP_LIST}
            element={
              <Suspense fallback={<BeatLoader />}>
                <RfpList />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.QUOTES}/:id`}
            element={
              <Suspense fallback={<BeatLoader />}>
                <RpfQuotes />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.ADD_RFP}
            element={
              <Suspense fallback={<BeatLoader />}>
                <AddRfp />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={[ROLE.VENDOR]} />}>
        <Route element={<AppLayoutVendor />}>
          <Route
            path={ROUTES.VENDOR_DASHBOARD}
            element={
              <Suspense fallback={<BeatLoader />}>
                <VendorDashboard />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.RFP_FOR_QUOTES}
            element={
              <Suspense fallback={<BeatLoader />}>
                <RfpForQuotes />
              </Suspense>
            }
          />
          <Route
            path={`${ROUTES.APPLY_RFP}/:id`}
            element={
              <Suspense fallback={<BeatLoader />}>
                <ApplyRfp />
              </Suspense>
            }
          />
        </Route>
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<>Not Found</>} />
    </Routes>
  );
};

export default AppRoutes;
