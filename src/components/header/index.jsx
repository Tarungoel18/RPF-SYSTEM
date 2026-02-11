import velocityLogo from "../../assets/images/velocity_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authslice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header id="page-topbar">
      <div className="navbar-header">
        <div className="d-flex bg-navy">
          <div className="d-none d-lg-block">
            <img
              src={velocityLogo}
              alt="Velocity Logo"
              width="250"
              height="75"
            />
          </div>
        </div>

        <div className="d-flex pr-2">
          <div className="dropdown d-inline-block">
            <span className=" d-xl-inline-block ml-1" key="t-henry">
              {user?.name}
            </span>
            &nbsp;&nbsp;
            <button className="button-unset text-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
