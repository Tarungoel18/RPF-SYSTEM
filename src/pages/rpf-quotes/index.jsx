import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from "../../components/table/index.jsx";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ROUTES } from "../../constants/RoutesConst.js";
import { useSelector } from "react-redux";
import { getRfpQuotes } from "../../service/Rfp.js";
import { useLocation } from "react-router-dom";

const RpfQutes = () => {
  const [rfpQuotesList, setRfpQuotesList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const location = useLocation();
  const { rfpId, quantity } = location.state || {};

  useEffect(() => {
    const fetchRfpQuotes = async () => {
      setIsLoading(true);
      try {
        if (!id) return;
        const res = await getRfpQuotes(id, token);
        const rfpQuotes = Object.values(res?.data?.quotes || {});
        setRfpQuotesList(rfpQuotes);
        console.log(res?.data?.quotes);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRfpQuotes();
  }, [id]);

  const offset = currentPage * itemsPerPage;
  const currentPageData = rfpQuotesList?.slice(offset, offset + itemsPerPage);
  const pageCount = rfpQuotesList
    ? Math.ceil(rfpQuotesList?.length / itemsPerPage)
    : 0;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const columns = [
    {
      header: "S No.",
      render: (row, rowIndex) => currentPage * itemsPerPage + rowIndex + 1,
    },
    {
      header: "RFP No.",
      render: () => rfpId,
    },
    {
      header: "Item Name",
      accessor: "name",
    },
    {
      header: "Vendor Id",
      accessor: "vendor_id",
    },
    {
      header: "Vendor Price",
      accessor: "item_price",
    },
    {
      header: "Quantity",
      render: () => quantity,
    },
    {
      header: "Total Price",
      accessor: "total_cost",
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
        <h5 className="mb-0">RFP Quotes</h5>

        <div className="page-title-right">
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item">
              <Link to={ROUTES.ADMIN_DASHBOARD}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={ROUTES.RFP_LIST}>RFP</Link>
            </li>
            <li className="breadcrumb-item active">RFP Quotes</li>
          </ol>
        </div>
      </div>
      <Table title={"RFP Quotes"} data={currentPageData} columns={columns} />
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

export default RpfQutes;
