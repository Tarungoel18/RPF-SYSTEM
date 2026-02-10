import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <div className="page-title-right">
      <ol className="breadcrumb m-0">
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${
              item.active ? "active" : ""
            }`}
          >
            {item.to && !item.active ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Breadcrumb;
