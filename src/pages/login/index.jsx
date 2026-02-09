import { login } from "./service/login";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/authslice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      //TODO-> Remove console.log

      const res = await login(formData);
      console.log(res);

      if (res?.data?.response === "success") {
        dispatch(
          loginSuccess({
            token: res?.data?.token,
            type: res?.data?.type,
            name: res?.data?.name,
            user_id: res?.data?.user_id,
            email: res?.data?.email,
          }),
        );
        toast.success("User logged in successfully");

        if (res?.data?.type === "admin") {
          //TODO-> move route to constant
          navigate("/dashboard-admin");
        } else {
          navigate("/dashboard-vendor")
        }
      } else {
        toast.error(res?.data?.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="account-pages my-5 pt-sm-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="bg-soft-primary">
                <div className="row">
                  <div className="col-12">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Welcome to RFP System!</h5>
                      <p>Sign in to continue</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body pt-0">
                <div className="p-2">
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <Field
                            type="text"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter Email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <Field
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter password"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="custom-control custom-checkbox">
                          <Field
                            type="checkbox"
                            name="rememberMe"
                            className="custom-control-input"
                            id="rememberMe"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div>

                        <div className="mt-3">
                          <button
                            className="btn btn-primary btn-block waves-effect waves-light"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Logging in..." : "Log In"}
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <h5 className="font-size-14 mb-3">Sign in with</h5>
                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <a
                                href="#"
                                className="social-list-item bg-primary text-white border-primary"
                              >
                                <i className="mdi mdi-facebook"></i>
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                href="#"
                                className="social-list-item bg-info text-white border-info"
                              >
                                <i className="mdi mdi-twitter"></i>
                              </a>
                            </li>
                            <li className="list-inline-item">
                              <a
                                href="#"
                                className="social-list-item bg-danger text-white border-danger"
                              >
                                <i className="mdi mdi-google"></i>
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div className="mt-4 text-center">
                          <a href="#" className="text-muted">
                            <i className="mdi mdi-lock mr-1"></i> Register as
                            Vendor
                          </a>
                        </div>

                        <div className="mt-4 text-center">
                          <a href="#" className="text-muted">
                            <i className="mdi mdi-lock mr-1"></i> Forgot your
                            password?
                          </a>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <p>
                © Copyright <i className="mdi mdi-heart text-danger"></i> RFP
                System
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
