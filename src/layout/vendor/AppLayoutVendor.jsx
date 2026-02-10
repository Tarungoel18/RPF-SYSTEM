import { Outlet } from "react-router-dom";
import "./vendor.css";
import Footer from "../../components/footer/index.jsx";
import Header from "../../components/header/index.jsx";
import { VENDOR_SIDEBAR_MENU } from "../../constants/AppConst.js";
import Sidebar from "../../components/sidebar/index.jsx";

const AppLayoutVendor = () => {
  return (
    <div id="layout-wrapper">
      <Header />
      <Sidebar menuItems={VENDOR_SIDEBAR_MENU} />
      <div className="main-content">
        <div className="page-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayoutVendor;
