import "./assets/css/app.css";
import "./assets/css/app.min.css";
import "./assets/css/bootstrap.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/icons.css";
import "./assets/css/icons.min.css";
import "./assets/css/style.css";
import { Toaster } from "react-hot-toast";

import VendorSignUp from "./pages/vendor-signup";
import Login from "./pages/login";
function App() {
  return (
    <>
      <VendorSignUp />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
