import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import AppLayoutAdmin from "../layout/admin/AppLayoutAdmin";
import AppLayoutVendor from "../layout/vendor/AppLayoutVendor";
import { BeatLoader } from "react-spinners";

const AdminDashboard = lazy(() => import("../pages/admin-dashboard"));
const VendorDashboard = lazy(() => import("../pages/vendor-dashboard"));
const Categories = lazy(() => import("../pages/categories"));
const AddCategory = lazy(() => import("../pages/add-category"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<BeatLoader/>}>
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route element={<AppLayoutAdmin />}>
            <Route path="/dashboard-admin" element={<AdminDashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/add-category" element={<AddCategory />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["vendor"]} />}>
          <Route element={<AppLayoutVendor />}>
            <Route path="/dashboard-vendor" element={<VendorDashboard />} />
          </Route>
        </Route>

        {/* TODO -> Create an unauthorized page */}
        <Route path="*" element={<>Unauthorized</>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

