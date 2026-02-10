import { Link } from "react-router-dom";

const Sidebar = ({ menuItems }) => {
  return (
    <div className="vertical-menu bg-navy">
      <div data-simplebar className="h-100">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="waves-effect hoverWhite">
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
