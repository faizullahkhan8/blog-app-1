import { Link, useLocation } from "react-router-dom";
import { MdError } from "react-icons/md";
import style from "./Style.module.css";
import { useSelector } from "react-redux";

const Error = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const location = useLocation().pathname;
    return (
        <div className={style.errorWrapper}>
            <MdError />
            <p>
                404 ): <span>&apos; {location.split("/")[1]} &apos;</span> Not
                Found
            </p>

            <Link className={style.linkToLogin} to={isAuth ? "/" : "/login"}>
                Go Back
            </Link>
        </div>
    );
};

export default Error;
