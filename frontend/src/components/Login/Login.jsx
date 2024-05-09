import { MdError } from "react-icons/md";
import Style from "./Style.module.css";
import { Link } from "react-router-dom";
import internal from "../../api/internal";
import { useState } from "react";
import { setUser } from "../../Store/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    // >-------> Handle States <------<
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // >------> set User Data<---------<
    const handleUserData = (e) => {
        setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    // >------> Communicate with server <---------<
    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await internal.login(data);
        if (response.status === 200) {
            // >------> user object from response <---------<
            const user = {
                _id: response.data.user._id,
                username: response.data.user.username,
                email: response.data.user.email,
                isAuth: response.data.auth,
            };

            // >------> set user globaly though redux <---------<
            dispatch(setUser(user));

            // >------> redirect to home page <---------<
            toast.success("logged in succesfully");
            navigate("/");
        }
        if (response.code === "ERR_BAD_REQUEST") {
            setError(response.response.data);
        }
    };
    return (
        <div className={Style.loginContainer}>
            <div className={Style.loginContainer_wrapper}>
                <h1>Login</h1>
                <input
                    required
                    autoFocus
                    id="email"
                    autoComplete="false"
                    type="text"
                    placeholder="Email..."
                    onChange={handleUserData}
                />
                <input
                    required
                    autoComplete="false"
                    id="password"
                    type="password"
                    placeholder="Password..."
                    onChange={handleUserData}
                />
                {error && (
                    <div className={Style.loginContainer_wrapper_error}>
                        <MdError />
                        <p>{error}</p>
                    </div>
                )}
                <button
                    disabled={!data.email || !data.password}
                    onClick={handleLogin}
                    className={Style.loginContainer_warpper_loginBtn}
                >
                    Login
                </button>
                <p className={Style.loginContainer_wrapper_notHaveAccount}>
                    Does't have an accout{" "}
                    <Link
                        to="/register"
                        className={
                            Style.loginContainer_wrapper_notHaveAccount_link
                        }
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
