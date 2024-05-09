import { NavLink, useNavigate } from "react-router-dom";
import Style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import internal from "../../api/internal";
import { resetUser } from "../../Store/user";
import { MdClose, MdList } from "react-icons/md";
import { toast } from "react-toastify";

const Navbar = () => {
    // >-----> handle states <------<
    const isAuth = useSelector((state) => state.user.isAuth);
    const username = useSelector((state) => state.user.username);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    // >-----> logout function <------<
    const handleLogout = async () => {
        try {
            const response = await internal.logout();

            if (response.status === 200) {
                dispatch(resetUser());
                toast.success("logout succesfully");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <nav className={Style.navBar}>
                <div className={Style.navBar_logo}>
                    <NavLink to="/">BlogBook</NavLink>
                </div>
                <div className={Style.navBar_links}>
                    <NavLink className={Style.navBar_links_link} to="/?cat=art">
                        ART
                    </NavLink>
                    <NavLink
                        className={Style.navBar_links_link}
                        to="/?cat=science"
                    >
                        SCIENCE
                    </NavLink>
                    <NavLink
                        className={Style.navBar_links_link}
                        to="/?cat=technology"
                    >
                        TECHNOLOGY
                    </NavLink>
                    <NavLink
                        className={Style.navBar_links_link}
                        to="/?cat=cinema"
                    >
                        CINEMA
                    </NavLink>
                    <NavLink
                        className={Style.navBar_links_link}
                        to="/?cat=design"
                    >
                        DESIGN
                    </NavLink>
                </div>
                <div className={Style.navBar_auth}>
                    {isAuth ? (
                        <div className={Style.navBar_auth_logOut}>
                            <button onClick={handleLogout}>Logout</button>
                            <div className={Style.navBar_auth_logOut_img}>
                                {username[0]}
                            </div>
                        </div>
                    ) : (
                        <div className={Style.navBar_auth_logIn}>
                            <NavLink to="/login">
                                <button className={Style.loginBtn}>
                                    login
                                </button>
                            </NavLink>
                            <NavLink to="/register">
                                <button className={Style.registerBtn}>
                                    register
                                </button>
                            </NavLink>
                        </div>
                    )}
                </div>
                <div className={Style.navBar_list}>
                    <MdList
                        onClick={() => {
                            navigate("/list");
                        }}
                    />
                </div>
            </nav>
            <div className={Style.seperator}></div>
        </>
    );
};

export default Navbar;
