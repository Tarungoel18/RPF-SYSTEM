import { useEffect, useState } from "react";
import Table from "../../components/table/index.jsx";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ROUTES } from "../../constants/RoutesConst.js";
import { closeRfp, getRfps } from "../../service/Rfp.js";
import toast from "react-hot-toast";
import Breadcrumb from "../../components/breadcrumb/index.jsx";
import { ADMIN_RFP_LIST_BREADCRUMBS } from "../../constants/AppConst.js";
const RfpList = () => {
  const [rfpList, setRfpList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);

  const fetchRfps = async () => {
    setIsLoading(true);
    try {
      const res = await getRfps();
      const rfps = Object.values(res?.data?.rfps || {});
      setRfpList(rfps);
      console.log(res?.data?.rfps);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRfps();
  }, []);

  const offset = currentPage * itemsPerPage;
  const currentPageData = rfpList?.slice(offset, offset + itemsPerPage);
  const pageCount = rfpList ? Math.ceil(rfpList?.length / itemsPerPage) : 0;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleStatus = async (row) => {
    //TODO-> ADD Spinner
    console.log(row);

    try {
      const res = await closeRfp(row?.rfp_id);
      if (res?.data?.response === "success") {
        toast.success(res?.data?.quotes);
        setRfpList((prev) =>
          prev.map((rfp) =>
            rfp.rfp_id === row.rfp_id ? { ...rfp, status: "closed" } : rfp,
          ),
        );
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      header: "RFP No.",
      accessor: "rfp_id",
    },
    {
      header: "RFP Title",
      accessor: "item_name",
    },
    {
      header: "RFP Last Date",
      accessor: "last_date",
    },
    {
      header: "Min Amount",
      accessor: "minimum_price",
    },
    {
      header: "Max Amount",
      accessor: "maximum_price",
    },
    {
      header: "Status",
      render: (row) => (
        <span
          className={`badge badge-pill ${
            row.status === "open" ? "badge-success" : "badge-danger"
          }`}
        >
          {row?.status?.toUpperCase()}
        </span>
      ),
    },
    {
      header: "Action",
      render: (row) => (
        <div className="d-flex gap-2 align-items-center">
          <Link
            to={`${ROUTES.QUOTES}/${row.rfp_id}`}
            state={{ rfpId: row.rfp_id, quantity: row.quantity }}
            title="View Quotes"
            className="text-primary"
          >
            <i className="mdi mdi-file-document-outline fs-5"></i>
          </Link>
          {row.status === "open" && (
            <button
              className="fst-italic button-unset text-danger"
              onClick={() => handleStatus(row)}
            >
              Close
            </button>
          )}
        </div>
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
        <h5 className="mb-0">RFP List</h5>
        <Breadcrumb items={ADMIN_RFP_LIST_BREADCRUMBS} />
      </div>
      <Table
        title={"RFP"}
        data={currentPageData}
        headerAction={
          <Link to={ROUTES.ADD_RFP}>
            <button className="btn btn-sm btn-success">
              <i className="mdi mdi-plus"></i> Add RFP
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

export default RfpList;
