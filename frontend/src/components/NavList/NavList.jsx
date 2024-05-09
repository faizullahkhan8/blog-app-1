import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Style from "./style.module.css";
import internal from "../../api/internal";
import { resetUser } from "../../Store/user";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const NavList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className={Style.links}>
            <NavLink className={Style.links_link} to="/">
                HOME
            </NavLink>
            <NavLink className={Style.links_link} to="/?cat=art">
                ART
            </NavLink>
            <NavLink className={Style.links_link} to="/?cat=science">
                SCIENCE
            </NavLink>
            <NavLink className={Style.links_link} to="/?cat=technology">
                TECHNOLOGY
            </NavLink>
            <NavLink className={Style.links_link} to="/?cat=cinema">
                CINEMA
            </NavLink>
            <NavLink className={Style.links_link} to="/?cat=design">
                DESIGN
            </NavLink>
            <button
                className={Style.logoutBtn}
                onClick={async () => {
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
                }}
            >
                LOGOUT
            </button>
        </div>
    );
};

export default NavList;
