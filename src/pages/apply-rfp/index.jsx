import { ROUTES } from "../../constants/RoutesConst";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { applyForRfp } from "../../service/Rfp";
import toast from "react-hot-toast";
import Breadcrumb from "../../components/breadcrumb";
import { APPLY_QUOTE_BREADCRUMBS } from "../../constants/AppConst";

const ApplyRfp = () => {
  const params = useParams();
  const validationSchema = Yup.object({
    itemPrice: Yup.number()
      .required("Item Price is required")
      .min(0, "Item Price cannot be negative"),
    totalCost: Yup.number()
      .required("Total Cost is required")
      .min(0, "Total Cost cannot be negative"),
  });

  const initialValues = {
    itemPrice: "",
    totalCost: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("item_price", values.itemPrice);
      formData.append("total_cost", values.totalCost);
      formData.append("_method", "put");
      const res = await applyForRfp(params?.id, formData);
      if (res?.data?.response === "success") {
        toast.success("Quote Submitted successfully");
        resetForm();
      } else {
        toast.error(res?.data?.errors?.[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex flex-column pt-1 px-3">
      <div className="page-title-box d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Apply RFP</h5>
        <Breadcrumb items={APPLY_QUOTE_BREADCRUMBS} />
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="itemPrice">
                        Item Price <em>*</em>
                      </label>
                      <Field
                        type="number"
                        name="itemPrice"
                        id="itemPrice"
                        className="form-control"
                        placeholder="Enter item price"
                      />
                      <ErrorMessage
                        name="itemPrice"
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>

                    <div className="form-group mt-3">
                      <label htmlFor="totalCost">
                        Total Cost <em>*</em>
                      </label>
                      <Field
                        type="number"
                        name="totalCost"
                        id="totalCost"
                        className="form-control"
                        placeholder="Enter total cost"
                      />
                      <ErrorMessage
                        name="totalCost"
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>

                    <div className="text-right mt-4">
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyRfp;
