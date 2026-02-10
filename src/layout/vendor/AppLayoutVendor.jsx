import velocityLogo from "../../assets/images/velocity_logo.png";
import { useSelector } from "react-redux";
import { logout } from "../../redux/slices/authslice.js";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "./vendor.css";
import { ROUTES } from "../../constants/RoutesConst.js";
import Footer from "../../components/footer/index.jsx";
import Header from "../../components/header/index.jsx";
//TODO-> Remove inline css and handle left navbar
const AppLayoutVendor = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div id="layout-wrapper">
     <Header/>
      <div className="vertical-menu bg-navy">
        <div data-simplebar className="h-100">
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li>
                {/* //TODO-> Use variable instead of hardcoding them in all the file */}
                <Link
                  to={ROUTES.VENDOR_DASHBOARD}
                  className="waves-effect hoverWhite"
                >
                  <i className="mdi mdi-file-document-box-outline"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.RFP_FOR_QUOTES}
                  className="waves-effect hoverWhite"
                >
                  <i className="mdi mdi-receipt"></i>
                  <span>RFP For Quotes</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
