const Joi = require("joi");
const fs = require("fs");
const blogModel = require("../model/blog");
const { SERVER_PATH } = require("../config/index");
const { where } = require("../model/token");

const Blogs = {
    async CreateBlog(req, res, next) {
        const createBlogSchema = Joi.object({
            title: Joi.string().required(),
            desc: Joi.string().required(),
            cat: Joi.string().required(),
            photo: Joi.string().required(),
            userId: Joi.string().required(),
        });

        const { error } = createBlogSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { title, desc, cat, photo, userId } = req.body;

        try {
            const buffer = new Buffer.from(
                photo.replace(/^data:image\/(jpeg|jpg|png);base64,/, ""),
                "base64"
            );

            const photoPath = `${Date.now()}-${userId}.png`;

            fs.writeFileSync(`storage/${photoPath}`, buffer);

            const blog = new blogModel({
                title,
                desc,
                cat,
                photo: `${SERVER_PATH}/storage/${photoPath}`,
                userId,
            });

            await blog.save();
        } catch (error) {
            return next(error);
        }

        return res.status(201).json("Blog created");
    },

    // >------> GET ALL BLOGS <-----<

    async getAll(req, res, next) {
        try {
            const cat = req.query.cat;

            const blogs = cat
                ? await blogModel.find({ cat })
                : await blogModel.find({});

            res.status(200).json({ blogs });
        } catch (error) {
            return next(error);
        }
    },

    async getById(req, res, next) {
        const { id } = req.params;

        if (!id) {
            return res.status(401).json("id is missing");
        }

        try {
            const blog = await blogModel.findOne({ _id: id });

            return res.status(200).json({ blog });
        } catch (error) {
            return next(error);
        }
    },

    async getByCat(req, res, next) {
        const { cat } = req.params;

        if (!cat) {
            return res.status(401).json("Category is missing");
        }

        try {
            const blogByCat = await blogModel.find({
                cat,
            });

            return res.status(200).json({ blogs: blogByCat });
        } catch (error) {
            return next(error);
        }
    },

    async deleteById(req, res, next) {
        const { id } = req.params;

        if (!id) {
            return res.status(401).json("Id is missing");
        }

        try {
            const blog = await blogModel.findOneAndDelete({ _id: id });

            const photoPath = blog.photo;

            fs.unlinkSync(`storage/${photoPath.split("/")[4]}`);
        } catch (error) {
            return next(error);
        }
        return res.status(200).json("Blog is deleted");
    },

    async updateById(req, res, next) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json("id is missing");
        }

        const { title, desc, cat, photo, userId } = req.body;

        if (!title || !desc || !cat || !userId) {
            return res.status(400).json("incomplete data");
        }

        if (photo) {
            const preBlog = await blogModel.findOne({ _id: id });
            if (!preBlog) return res.status(404).json("Not founded!");

            const preBlogPhoto = preBlog.photo;

            try {
                fs.unlinkSync(`storage/${preBlogPhoto.split("/")[4]}`);
            } catch (error) {
                return next(error);
            }

            const buffer = new Buffer.from(
                photo.replace(/^data:image\/(jpeg|jpg|png);base64,/, ""),
                "base64"
            );

            const photoPath = `${Date.now()}-${userId}.png`;

            fs.writeFileSync(`storage/${photoPath}`, buffer);

            try {
                await blogModel.findOneAndUpdate(
                    { _id: id },
                    {
                        title,
                        desc,
                        cat,
                        photo: `${SERVER_PATH}/storage/${photoPath}`,
                    },
                    {
                        upsert: true,
                    }
                );
            } catch (error) {
                return next(error);
            }
            return res.status(200).json("Updated Succesfully");
        }

        try {
            await blogModel.findOneAndUpdate(
                { _id: id },
                { title, desc, cat },
                {
                    upsert: true,
                }
            );
        } catch (error) {
            return next(error);
        }

        res.status(200).json("Updated Succesfully");
    },
};

module.exports = Blogs;
