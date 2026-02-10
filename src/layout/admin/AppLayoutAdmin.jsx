import { Outlet } from "react-router-dom";
import "./admin.css";
import Footer from "../../components/footer/index.jsx";
import Header from "../../components/header/index.jsx";
import { ADMIN_SIDEBAR_MENU } from "../../constants/AppConst.js";
import Sidebar from "../../components/sidebar/index.jsx";

const AppLayoutAdmin = () => {
  return (
    <div id="layout-wrapper">
      <Header />
      <Sidebar menuItems={ADMIN_SIDEBAR_MENU} />
      <div className="main-content">
        <div className="page-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayoutAdmin;
