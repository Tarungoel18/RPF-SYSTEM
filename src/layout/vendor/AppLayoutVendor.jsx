import velocityLogo from "../../assets/images/velocity_logo.png"
import { useSelector } from "react-redux";
import { logout } from "../../redux/slices/authslice.js";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "./vendor.css"
import { ROUTES } from "../../constants/RoutesConst.js";
//TODO-> Remove inline css and handle left navbar
const AppLayoutVendor = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div id="layout-wrapper">
      <header id="page-topbar">
        <div className="navbar-header">
          <div
            className="d-flex bg-navy"
          >
            <div className="navbar-brand-box">
              <span className="logo-lg">
                <img src={velocityLogo} alt="Velocity Logo" height="75" />
              </span>
            </div>
          </div>

          <div className="d-flex pr-2">
            <div className="dropdown d-inline-block">
              <span className="d-none d-xl-inline-block ml-1" key="t-henry">
                {user?.name}
              </span>
              &nbsp;&nbsp;
              {/* //TODO-> change logout button style */}
              <button className=""  onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* //TODO->Remove inline css */}

      <div className="vertical-menu bg-navy">
        <div data-simplebar className="h-100">
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li>
                {/* //TODO-> Use variable instead of hardcoding them in all the file */}
                <Link to="/dashboard" className="waves-effect hoverWhite">
                  <i className="mdi mdi-file-document-box-outline"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="waves-effect hoverWhite">
                  <i className="mdi mdi-receipt"></i>
                  <span>Vendors</span>
                </Link>
              </li>
              <li>
                <Link to="/rpf-list" className="waves-effect hoverWhite">
                  <i className="mdi mdi-flip-vertical"></i>
                  <span>RFP Lists</span>
                </Link>
              </li>
              <li>
                <Link to="/users" className="waves-effect hoverWhite">
                  <i className="mdi mdi-apps"></i>
                  <span>User Management</span>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CATEGORIES} className="waves-effect hoverWhite">
                  <i className="mdi mdi-weather-night"></i>
                  <span>Categories</span>
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

        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">2022 &copy; Copyright.</div>
              <div className="col-sm-6">
                <div className="text-sm-right d-none d-sm-block">
                  Support Email:{" "}
                  <a href="#" target="_blank" className="text-muted">
                    support@velsof.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppLayoutVendor;
