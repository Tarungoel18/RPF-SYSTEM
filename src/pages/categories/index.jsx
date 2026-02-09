import { useEffect, useState } from "react";
import { getCategories } from "./service/getCategories";
import Table from "../../components/table/index.jsx";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await getCategories();
        setCategories(res?.data?.categories);
        console.log(res?.data?.categories);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleStatus = (row) => {
    //TODO-> Change according to the api
    console.log("Clickedd", row);
  };

  const columns = [
    {
      header: "S. No.",
      accessor: "id",
    },
    {
      header: "Categories Name",
      accessor: "name",
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`badge badge-pill ${
            row.status === "Active" ? "badge-success" : "badge-danger"
          }`}
        >
          {row?.status}
        </span>
      ),
    },
    {
      header: "Action",
      //TODO-> Change Style
      render: (row) => (
        <button
          className={`btn btn-sm ${
            row.status === "Active" ? "btn-danger" : "btn-success"
          }`}
          onClick={() => handleStatus(row)}
        >
          {row.status === "Active" ? "Deactivate" : "Activate"}
        </button>
      ),
    },
  ];

  if (isLoading)
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <BeatLoader />
      </div>
    );
  return (
    <div className="d-flex flex-column pt-1 px-3">
      {/* //TODO-> Add Heading and Breadcrumb */}
      <div className="page-title-box d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Categories</h5>

        <div className="page-title-right">
          <ol class="breadcrumb m-0">
            <li className="breadcrumb-item">
              <Link to="/dashboard-admin">Home</Link>
            </li>
            <li className="breadcrumb-item active">Categories</li>
          </ol>
        </div>
      </div>
      <Table
        title={"Categories"}
        data={categories}
        headerAction={
          <Link to="/add-category">
            <button className="btn btn-sm btn-success">
              <i className="mdi mdi-plus"></i> Add Category
            </button>
          </Link>
        }
        columns={columns}
      />
    </div>
  );
};

export default Categories;
