import { useEffect, useState } from "react";
import { getCategories } from "../../service/Category.js";
import Table from "../../components/table/index.jsx";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ROUTES } from "../../constants/RoutesConst.js";
import "./index.css";
import Breadcrumb from "../../components/breadcrumb/index.jsx";
import { CATEGORIES_BREADCRUMBS } from "../../constants/AppConst.js";

const Categories = () => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await getCategories();
      const cats = Object.values(res?.data?.categories || {})
        .slice()
        .reverse();
      setCategories(cats);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  const offset = currentPage * itemsPerPage;
  const currentPageData = categories?.slice(offset, offset + itemsPerPage);
  const pageCount = categories
    ? Math.ceil(categories.length / itemsPerPage)
    : 0;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleStatus = (row) => {
  };

  const columns = [
    {
      header: "S. No.",
      render: (row, rowIndex) => currentPage * itemsPerPage + rowIndex + 1,
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
          {row?.status?.toUpperCase()}
        </span>
      ),
    },
    {
      header: "Action",
      render: (row) => (
        <button
          className={`fst-italic button-unset ${
            row.status === "Active" ? "text-danger" : "text-success"
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
      <div className="page-title-box d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Categories</h5>
        <Breadcrumb items={CATEGORIES_BREADCRUMBS} />
      </div>
      <Table
        title={"Categories"}
        data={currentPageData}
        headerAction={
          <Link to={ROUTES.ADD_CATEGORY}>
            <button className="btn btn-sm btn-success">
              <i className="mdi mdi-plus"></i> Add Category
            </button>
          </Link>
        }
        columns={columns}
      />
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Categories;
