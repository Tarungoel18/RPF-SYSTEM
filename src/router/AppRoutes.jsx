import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AppLayoutAdmin from "../layout/admin/AppLayoutAdmin";
import AppLayoutVendor from "../layout/vendor/AppLayoutVendor";
import AdminDashboard from "../pages/admin-dashboard";
import VendorDashboard from "../pages/vendor-dashboard";
import Categories from "../pages/categories";
import AddCategory from "../pages/add-category";
//TODO->Lazy loading

const AppRoutes = () => {
  return (
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
      {/* //TODO->Create a unauthorized page with link to navigate to dashboard*/}
      <Route path="*" element={<>Unauthorized</>} />
    </Routes>
  );
};

export default AppRoutes;
