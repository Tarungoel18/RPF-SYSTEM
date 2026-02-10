import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ROUTES } from "../../constants/RoutesConst.js";
import { getCategories } from "../../service/Category.js";
import { getVendorsByCategory } from "../../service/Vendors.js";
import { addRpf } from "../../service/Rfp.js";

const AddRfp = () => {
  const [allCategories, setAllCategories] = useState(null);
  const [allVendors, setAllVendors] = useState(null);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        if (res?.data?.response === "success") {
          const categoriesArray = Object.values(res?.data?.categories);
          setAllCategories(categoriesArray);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
    itemName: Yup.string()
      .required("Item Name is required")
      .min(2, "Item Name must be atleast 2 characters")
      .max(50, "Item Name cannot exceed 50 characters"),
    itemDescription: Yup.string()
      .required("Item Description is required")
      .min(2, "Item Name must be atleast 2 characters")
      .max(100, "Item Name cannot exceed 100 characters"),
    rfpNo: Yup.string().required("RFP No. is required"),
    quantity: Yup.string()
      .required("Quantity  is required")
      .min(1, "Quantity must be atleast 1"),
    lastDate: Yup.string().required("Last Date is required"),
    minimumPrice: Yup.string()
      .required("Minimun Price is required")
      .min(1, "Minimun Price must be atleast 1"),
    maximumPrice: Yup.string()
      .required("Maximum Price is required")
      .min(1, "Maximum Price must be atleast 1"),
    vendors: Yup.array().min(1, "Vendor is required").of(Yup.string()),
  });

  const initialValues = {
    category: "",
    itemName: "",
    itemDescription: "",
    rfpNo: "",
    quantity: "",
    lastDate: "",
    minimumPrice: "",
    maximumPrice: "",
    vendors: [],
  };

  const handleCategoryChange = async (e, setFieldValue) => {
    const categoryId = e.target.value;

    setFieldValue("category", categoryId);
    setFieldValue("vendors", []);

    if (!categoryId) {
      setAllVendors([]);
      return;
    }

    try {
      const res = await getVendorsByCategory(categoryId);
      const vendorsArray = Object.values(res?.data?.vendors || {});
      setAllVendors(vendorsArray);
    } catch (error) {
      console.error(error);
      setAllVendors([]);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("user_id", user?.id);
      formData.append("item_name", values.itemName);
      formData.append("rfp_no", values.rfpNo);
      formData.append("quantity", values.quantity);
      formData.append("minimum_price", values.minimumPrice);
      formData.append("maximum_price", values.maximumPrice);
      formData.append("last_date", values.lastDate);
      formData.append("vendors", values.vendors.join(","));
      formData.append("categories", values.category);
      formData.append("item_description", values.itemDescription);
      console.log("Form Values:", values);
      const res = await addRpf(formData);
      if (res?.data?.response === "success") {
        toast.success("RPF Added Successfully");
      } else {
        toast.error(res?.data?.errors?.[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      resetForm();
    }
  };

  return (
    //TODO-> BREADCRUMBS-> Constant
    <div className="d-flex flex-column pt-1 px-3">
      <div className="page-title-box d-flex align-items-center justify-content-between">
        <h5 className="mb-0">RFP Create</h5>

        <div className="page-title-right">
          <ol className="breadcrumb m-0">
            <li className="breadcrumb-item">
              <Link to={ROUTES.ADMIN_DASHBOARD}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={ROUTES.RFP_LIST}>RFP</Link>
            </li>
            <li className="breadcrumb-item active">RFP Create</li>
          </ol>
        </div>
      </div>

      <div className="row">
        <div className=" col-lg-12">
          <div className="card">
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, isSubmitting }) => (
                  <Form>
                    <div className="form-group mb-3">
                      <label htmlFor="categories">
                        Categories <em>*</em>
                      </label>
                      <Field
                        as="select"
                        name="category"
                        className="form-control"
                        onChange={(e) => handleCategoryChange(e, setFieldValue)}
                      >
                        {allCategories?.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="categories"
                        component="div"
                        className="text-danger mt-1"
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="itemName">
                            Item Name <em>*</em>
                          </label>
                          <Field
                            type="text"
                            name="itemName"
                            id="itemName"
                            className="form-control"
                            placeholder="Enter item name"
                          />
                          <ErrorMessage
                            name="itemName"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="itemDescription">
                            Item Description <em>*</em>
                          </label>
                          <Field
                            as="textarea"
                            name="itemDescription"
                            id="itemDescription"
                            className="form-control"
                            placeholder="Enter item description"
                          />
                          <ErrorMessage
                            name="itemDescription"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="rfpNo">
                            RFP No <em>*</em>
                          </label>
                          <Field
                            type="text"
                            name="rfpNo"
                            id="rfpNo"
                            className="form-control"
                            placeholder="Enter RFP number"
                          />
                          <ErrorMessage
                            name="rfpNo"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="quantity">
                            Quantity <em>*</em>
                          </label>
                          <Field
                            type="number"
                            name="quantity"
                            id="quantity"
                            className="form-control"
                            placeholder="Enter quantity"
                          />
                          <ErrorMessage
                            name="quantity"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="lastDate">
                            Last Date <em>*</em>
                          </label>
                          <Field
                            type="date"
                            name="lastDate"
                            id="lastDate"
                            className="form-control"
                          />
                          <ErrorMessage
                            name="lastDate"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="minimumPrice">
                            Minimum Price <em>*</em>
                          </label>
                          <Field
                            type="number"
                            name="minimumPrice"
                            id="minimumPrice"
                            className="form-control"
                            placeholder="Enter minimum price"
                          />
                          <ErrorMessage
                            name="minimumPrice"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="maximumPrice">
                            Maximum Price <em>*</em>
                          </label>
                          <Field
                            type="number"
                            name="maximumPrice"
                            id="maximumPrice"
                            className="form-control"
                            placeholder="Enter maximum price"
                          />
                          <ErrorMessage
                            name="maximumPrice"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label htmlFor="vendors">
                            Vendors <em>*</em>
                          </label>
                          <Field
                            as="select"
                            name="vendors"
                            multiple
                            className="form-control"
                            value={values.vendors}
                            onChange={(e) => {
                              const selectedVendorIds = Array.from(
                                e.target.selectedOptions,
                                (option) => option.value,
                              );
                              setFieldValue("vendors", selectedVendorIds);
                            }}
                          >
                            {allVendors?.map((vendor) => (
                              <option
                                key={vendor?.user_id}
                                value={vendor?.user_id}
                              >
                                {vendor.name}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name="vendors"
                            component="div"
                            className="text-danger mt-1"
                          />
                        </div>
                      </div>
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

export default AddRfp;
