import { useEffect, useState } from "react";
import Table from "../../components/table/index.jsx";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ROUTES } from "../../constants/RoutesConst.js";
import { getRfpsByUserId } from "../../service/Rfp.js";
import { useSelector } from "react-redux";
import QuoteModal from "./components/modal/index.jsx";
import "./index.css";

const RfpForQuotes = () => {
  const [rfpList, setRfpList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedRfpId, setSelectedRfpId] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchRfps = async () => {
      setIsLoading(true);
      try {
        const res = await getRfpsByUserId(user?.id);
        const rfps = Object.values(res?.data?.rfps || {});
        setRfpList(rfps);
        console.log(res?.data?.rfps);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRfps();
  }, []);

  const offset = currentPage * itemsPerPage;
  const currentPageData = rfpList?.slice(offset, offset + itemsPerPage);
  const pageCount = rfpList ? Math.ceil(rfpList?.length / itemsPerPage) : 0;

  const handleViewQuote = (rfpId) => {
    setSelectedRfpId(rfpId);
    setShowModal(true);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
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
            row.applied_status === "open" ? "badge-success" : "badge-danger"
          }`}
        >
          {row?.applied_status?.toUpperCase()}
        </span>
      ),
    },
    {
      header: "Action",
      render: (row) => (
        <div>
          {row?.applied_status === "open" ? (
            <Link
              to={`${ROUTES.APPLY_RFP}/${row.rfp_id}`}
              className=" fst-italic text-success"
            >
              Apply
            </Link>
          ) : (
            <button
              className=" fst-italic text-danger btn-unset"
              onClick={() => handleViewQuote(row.rfp_id)}
            >
              View Quote
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

        <div className="page-title-right">
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item">
              <Link to={ROUTES.VENDOR_DASHBOARD}>Home</Link>
            </li>
            <li className="breadcrumb-item active">RFP List</li>
          </ol>
        </div>
      </div>
      <Table title={"RFP"} data={currentPageData} columns={columns} />
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
      {showModal && (
        <QuoteModal
          show={showModal}
          onHide={() => setShowModal(false)}
          rfpId={selectedRfpId}
        />
      )}
    </div>
  );
};

export default RfpForQuotes;
