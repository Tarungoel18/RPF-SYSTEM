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

const AppRoutes = () => {
  return (
    <Suspense fallback={<BeatLoader />}>
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={[ROLE.ADMIN]} />}>
          <Route element={<AppLayoutAdmin />}>
            <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
            <Route path={ROUTES.CATEGORIES} element={<Categories />} />
            <Route path={ROUTES.ADD_CATEGORY} element={<AddCategory />} />
            <Route path={ROUTES.VENDORS_LIST} element={<VendorsList />} />
            <Route path={ROUTES.RFP_LIST} element={<RfpList />} />
            <Route path={`${ROUTES.QUOTES}/:id`} element={<RpfQuotes />} />
            <Route path={ROUTES.ADD_RFP} element={<AddRfp />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={[ROLE.VENDOR]} />}>
          <Route element={<AppLayoutVendor />}>
            <Route
              path={ROUTES.VENDOR_DASHBOARD}
              element={<VendorDashboard />}
            />
          </Route>
        </Route>

        {/* TODO -> Create an Not Found page */}
        <Route path={ROUTES.NOT_FOUND} element={<>Not Found</>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
