import Breadcrumb from "../../components/breadcrumb";
import { HOME_BREADCRUMBS } from "../../constants/AppConst";
const VendorDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">Dashboard</h4>
            <Breadcrumb items={HOME_BREADCRUMBS} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div>Welcome to RFP System.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
