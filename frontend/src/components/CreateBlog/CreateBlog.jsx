import style from "./style.module.css";
import internal from "../../api/internal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateBlog = () => {
    // >-----> states <-------<
    const navigate = useNavigate();
    const state = useLocation()?.state;
    const userId = useSelector((state) => state?.user?._id);
    const [photoInfo, setPhotoInfo] = useState([]);

    const [data, setData] = useState({
        title: state?.title || "",
        desc: state?.desc || "",
        photo: "",
        cat: state?.cat || "",
        userId,
    });
    const handleUpload = async (e) => {
        e.preventDefault();

        let response;

        const UpadateData = {
            title: data?.title,
            desc: data?.desc,
            cat: data?.cat,
            blogId: state?._id,
            userId,
            photo: data?.photo ? data.photo : null,
        };

        response = state
            ? await internal.updateBlog(UpadateData, state._id)
            : await internal.createBlog(data);

        if (response.status === 201) {
            toast.success("blog created succesfully");
            navigate("/");
        } else if (response.status === 200) {
            toast.success("blog updated succesfully");
            navigate("/");
        }
    };

    const getPhoto = (e) => {
        const image = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
            setData({ ...data, photo: reader.result });
        };

        setPhotoInfo(image);
    };

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    return (
        <div className={style.createBlogWrapper}>
            <div className={style.createBlogWrapper_TD}>
                <input
                    type="text"
                    placeholder="Title..."
                    id="title"
                    value={data.title}
                    onChange={handleChange}
                />
                <textarea
                    cols="30"
                    rows="10"
                    placeholder="Description..."
                    id="desc"
                    value={data.desc}
                    onChange={handleChange}
                />
            </div>
            <div className={style.createBlogWrapper_PC}>
                <div className={style.createBlogWrapper_PC_cat}>
                    <div>
                        <input
                            type="radio"
                            id="cat"
                            onChange={handleChange}
                            name="cat"
                            checked={data.cat === "art"}
                            value="art"
                        />
                        <label htmlFor="">ART</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="cat"
                            onChange={handleChange}
                            name="cat"
                            value="science"
                            checked={data.cat === "science"}
                        />
                        <label htmlFor="">SCIENCE</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="cat"
                            onChange={handleChange}
                            name="cat"
                            value="technology"
                            checked={data.cat === "technology"}
                        />
                        <label htmlFor="">TECHONOLOGY</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="cat"
                            onChange={handleChange}
                            name="cat"
                            value="cinema"
                            checked={data.cat === "cinema"}
                        />
                        <label htmlFor="">CENIMA</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="cat"
                            onChange={handleChange}
                            name="cat"
                            value="design"
                            checked={data.cat === "design"}
                        />
                        <label htmlFor="">DESIGN</label>
                    </div>
                </div>
                <div className={style.createBlogWrapper_PC_pic}>
                    <span>Publish :</span>
                    <span>Status : draft</span>
                    <label htmlFor="blogImg">Choose a photo</label>
                    {photoInfo.name && (
                        <span style={{ fontSize: "14px" }}>
                            Photo: {photoInfo.name}
                        </span>
                    )}
                    {photoInfo.size && (
                        <span style={{ fontSize: "14px" }}>
                            Size: {photoInfo.size}
                        </span>
                    )}
                    {photoInfo.type && (
                        <span style={{ fontSize: "14px" }}>
                            Type: {photoInfo.type}
                        </span>
                    )}
                    <input
                        type="file"
                        id="blogImg"
                        hidden
                        onChange={getPhoto}
                    />
                    <div className={style.Btn}>
                        <button>Save as draft</button>
                        <button onClick={handleUpload}>
                            {state ? "Update" : "Upload"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;
