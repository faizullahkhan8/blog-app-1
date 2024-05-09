import { Outlet, createBrowserRouter } from "react-router-dom";
import CreateBlog from "../components/CreateBlog/CreateBlog.jsx";
import Login from "../components/Login/Login.jsx";
import Register from "../components/Register/Register.jsx";
import Single from "../components/Single/Single.jsx";
import Home from "../components/Home/Home.jsx";
import Error from "../components/Error/Error.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import style from "./style.module.css";
import { Protected } from "../components/Protected/Protected.js";
import NavList from "../components/NavList/NavList.jsx";

const Layout = () => {
    return (
        <div className={style.layout}>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            // Home Route
            {
                path: "/",
                element: (
                    <Protected>
                        <div className={style.main}>
                            <Home />
                        </div>
                    </Protected>
                ),
            },
            // Single Route
            {
                path: "/blog/:id",
                element: (
                    <Protected>
                        <div className={style.main}>
                            <Single />
                        </div>
                    </Protected>
                ),
            },
            {
                //Create Blog Route
                path: "/blog/create",
                element: (
                    <Protected>
                        <div className={style.main}>
                            <CreateBlog />
                        </div>
                    </Protected>
                ),
            },
        ],
    },
    // Login Route
    {
        path: "/login",
        element: <Login />,
    },
    // Register Route
    {
        path: "/register",
        element: <Register />,
    },
    // NavBar List
    {
        path: "/list",
        element: <NavList />,
    },
    // Error Route
    {
        path: "*",
        element: <Error />,
    },
]);
