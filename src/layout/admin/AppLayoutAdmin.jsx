import velocityLogo from "../../assets/images/velocity_logo.png";
import { useSelector } from "react-redux";
import { logout } from "../../redux/slices/authslice.js";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "./admin.css";
import { ROUTES } from "../../constants/RoutesConst.js";
import Footer from "../../components/footer/index.jsx";
import Header from "../../components/header/index.jsx";
//TODO-> Remove inline css and handle left navbar and handle Breadcrumbs

const AppLayoutAdmin = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div id="layout-wrapper">
      <Header />

      <div className="vertical-menu bg-navy">
        <div data-simplebar className="h-100">
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li>
                <Link
                  to={ROUTES.ADMIN_DASHBOARD}
                  className="waves-effect hoverWhite"
                >
                  <i className="mdi mdi-file-document-box-outline"></i>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.CATEGORIES}
                  className="waves-effect hoverWhite"
                >
                  <i className="mdi mdi-receipt"></i>
                  <span>Categories</span>
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.VENDORS_LIST}
                  className="waves-effect hoverWhite"
                >
                  <i className="mdi mdi-flip-vertical"></i>
                  <span>Vendors</span>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RFP_LIST} className="waves-effect hoverWhite">
                  <i className="mdi mdi-apps"></i>
                  <span>RFP Lists</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* //TODO-> Make a seprate component for this */}
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
