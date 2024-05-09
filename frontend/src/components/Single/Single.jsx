import { useEffect, useState } from "react";
import style from "./Style.module.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import internal from "../../api/internal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Single = () => {
    const { id } = useParams();

    const location = useLocation;
    const navigate = useNavigate();

    const username = useSelector((state) => state.user.username);

    const userId = useSelector((state) => state.user._id);

    const [blog, setBlog] = useState({});

    const [blogByCat, setBlogByCat] = useState([]);

    const createdAt = new Date(blog.createdAt).toDateString();

    useEffect(() => {
        (async () => {
            try {
                const response = await internal.getById(id);

                setBlog(response.data.blog);
            } catch (error) {
                console.log(error);
            }
        })();

        return () => {
            setBlog({});
        };
    }, []);
    useEffect(() => {
        (async () => {
            try {
                const response = await internal.getByCat(blog.cat);

                setBlogByCat(response.data.blogs);
            } catch (error) {
                console.log(error);
            }
        })();
        return () => {
            setBlogByCat([]);
        };
    }, []);

    const handleDelete = async () => {
        try {
            await internal.deleteById(blog._id);
            toast.success("deleted succesfully");
            navigate("/");
        } catch (error) {
            toast.error("deleted succesfully");
        }
    };

    return (
        <div className={style.wrapper}>
            <div className={style.rightSide}>
                <div className={style.rightSide_img}>
                    <img src={blog.photo} alt="blog" />
                </div>
                <div className={style.rightSide_userInfo}>
                    <div className={style.rightSide_userInfo_img}>
                        {username[0]}
                    </div>
                    <div className={style.rightSide_userInfo_NP}>
                        <span>
                            <span
                                style={{
                                    color: "#9be7e7",
                                    fontWeight: "bold",
                                    fontSize: "24px",
                                }}
                            >
                                @
                            </span>{" "}
                            {username}
                        </span>
                        <span>{createdAt}</span>
                    </div>
                    {blog.userId === userId && (
                        <div className={style.rightSide_userInfo_opt}>
                            <Link to="/blog/create" state={blog}>
                                <MdEdit className={style.edit} />
                            </Link>
                            <MdDelete
                                className={style.delete}
                                onClick={handleDelete}
                            />
                        </div>
                    )}
                </div>
                <div className={style.rightSide_title}>
                    <span>{blog.title}</span>
                </div>
                <div className={style.rightSide_desc}>
                    <p>{blog.desc}</p>
                </div>
            </div>
            <div className={style.leftSide}>
                <h3> Other posts you may like </h3>
                {blogByCat?.map((blog) => {
                    return (
                        <div className={style.leftSide_blog} key={blog._id}>
                            <div className={style.leftSide_blog_img}>
                                <img src={blog.photo} alt="blog" />
                            </div>
                            <div className={style.leftSide_blog_title}>
                                {blog.title}
                            </div>
                            <div>
                                <Link to={`/blog/${blog._id}`}>see more</Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Single;
