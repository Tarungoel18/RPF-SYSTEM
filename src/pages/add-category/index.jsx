import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const AddCategory = () => {
  const {token} = useSelector((state) => state.auth)
  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
  });

  const initialValues = {
    category: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    try{
      const formData = new FormData();
    formData.append()
    }
    catch(error){
      console.error(error)
    }
  };
  return (
    <div className="d-flex flex-column pt-1 px-3">
      {/* //TODO-> Add Heading and Breadcrumb */}
      <div className="page-title-box d-flex align-items-center justify-content-between">
        <h5 className="mb-0">Add Category</h5>

        <div className="page-title-right">
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item">
              <Link to="/dashboard-admin">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/categories">Categories</Link>
            </li>
            <li className="breadcrumb-item active">Add Category</li>
          </ol>
        </div>
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
                      <label htmlFor="category">
                        Category Name <em>*</em>
                      </label>
                      <Field
                        type="text"
                        name="category"
                        id="category"
                        className="form-control"
                        placeholder="Enter category name"
                      />
                      <ErrorMessage
                        name="category"
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

export default AddCategory;
