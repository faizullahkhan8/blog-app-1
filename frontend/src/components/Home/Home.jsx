import { useEffect, useState } from "react";
import internal from "../../api/internal";
import style from "./Style.module.css";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]);
    const location = useLocation();
    const cat = location.search;

    useEffect(() => {
        (async () => {
            try {
                let response = await internal.getAll(cat);

                setData(response.data.blogs);
            } catch (error) {
                console.log("Home > getAll", error);
            }
        })();

        // clean up
        setData([]);
    }, [cat]);

    return (
        <div className={style.blogsContainer}>
            <Link className={style.blogsContainer_create} to="/blog/create">
                Create blog
            </Link>
            {data.map((blog) => {
                return (
                    <div className={style.blogWrapper} key={blog?._id}>
                        <div className={style.blogWrapper_info}>
                            <div className={style.blogWrapper_info_TD}>
                                <div>{blog?.title}</div>
                                <div>{blog?.desc}</div>
                            </div>
                            <div
                                className={style.blogWrapper_info_linkContainer}
                            >
                                <Link
                                    className={style.blogWrapper_info_link}
                                    to={`/blog/${blog?._id}`}
                                >
                                    read more
                                </Link>
                            </div>
                        </div>
                        <div className={style.blogWrapper_img}>
                            <img src={blog?.photo} alt="blog" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
