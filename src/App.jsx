import "./assets/css/app.css";
import "./assets/css/app.min.css";
import "./assets/css/bootstrap.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/icons.css";
import "./assets/css/icons.min.css";
import "./assets/css/style.css";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import AppRoutes from "./router/AppRoutes";
import AuthRoutes from "./router/AuthRoutes";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <>
      {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
