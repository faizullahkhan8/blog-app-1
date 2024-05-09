import { RouterProvider } from "react-router-dom";
import { Router } from "./Routes/Routes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
    return (
        <div>
            <RouterProvider router={Router} />
            <ToastContainer />
        </div>
    );
};

export default App;
