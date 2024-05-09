import { MdError } from "react-icons/md";
import Style from "./Style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../../api/internal";
import { useFormik } from "formik";
import RegisterationSchema from "../../Schema/register";
import { useDispatch } from "react-redux";
import { setUser } from "../../Store/user";
import { toast } from "react-toastify";

const Register = () => {
    // <-------handle states------>
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // <-------validate user data------>
    const { errors, handleChange, values } = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            comfirmPassword: "",
        },
        validationSchema: RegisterationSchema,
    });

    // <-------Reading user data------>
    const handleUserData = (e) => {
        setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
    // <-------Communicate with server------>
    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        try {
            response = await API.register(data);
        } catch (error) {
            console.log(error);
        }
        if (response.status === 201) {
            // <-------set redux states------>
            let data = {
                _id: response.data.user._id,
                username: response.data.user.username,
                email: response.data.user.email,
                isAuth: response.data.auth,
            };

            dispatch(setUser(data));

            toast.success("User registered succesfully");

            navigate("/");
        } else {
            setError(response.response.data.message);
        }
    };

    return (
        <div className={Style.loginContainer}>
            <form className={Style.loginContainer_wrapper}>
                <h1>Register</h1>
                <input
                    required
                    autoFocus
                    id="name"
                    type="text"
                    autoComplete="false"
                    value={values.name}
                    onChange={(e) => {
                        handleChange(e);
                        handleUserData(e);
                    }}
                    placeholder="Full Name..."
                />
                <input
                    required
                    type="text"
                    id="username"
                    value={values.username}
                    autoComplete="false"
                    onChange={(e) => {
                        handleChange(e);
                        handleUserData(e);
                    }}
                    placeholder="Username..."
                />
                <input
                    required
                    type="text"
                    id="email"
                    value={values.email}
                    autoComplete="false"
                    onChange={(e) => {
                        handleChange(e);
                        handleUserData(e);
                    }}
                    placeholder="Email..."
                />
                <input
                    required
                    type="password"
                    id="password"
                    value={values.password}
                    autoComplete="false"
                    onChange={(e) => {
                        handleChange(e);
                        handleUserData(e);
                    }}
                    placeholder="Password..."
                />
                {error && (
                    <div className={Style.loginContainer_wrapper_error}>
                        <MdError />
                        <p>{error}</p>
                    </div>
                )}
                <button
                    onClick={handleSubmit}
                    className={Style.loginContainer_warpper_loginBtn}
                    disabled={
                        errors.name ||
                        errors.username ||
                        errors.email ||
                        errors.password
                    }
                >
                    Register
                </button>
                <p className={Style.loginContainer_wrapper_notHaveAccount}>
                    Have an accout{" "}
                    <Link
                        to="/login"
                        className={
                            Style.loginContainer_wrapper_notHaveAccount_link
                        }
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
