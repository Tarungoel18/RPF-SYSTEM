import { useEffect, useState } from "react";
import { getRfpQuotes } from "../../../../service/Rfp.js";
import "./index.css";
const QuoteModal = ({ show, onHide, rfpId }) => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await getRfpQuotes(rfpId);
      setQuote(res?.data?.quote);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (rfpId && show) {
      fetchQuote();
    }
  }, [rfpId, show]);

  if (!show) return null;

  return (
    <div className="modal show d-block bg-modal" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Quote Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
            ></button>
          </div>

          <div className="modal-body">
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : quote ? (
              <div>
                <p>
                  <strong>Quoted Amount:</strong> {quote?.total_cost}
                </p>
              </div>
            ) : (
              <p>No quote found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
