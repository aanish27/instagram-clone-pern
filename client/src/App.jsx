import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Routes />
    </AuthProvider>
  );
}

export default App;
