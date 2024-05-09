const express = require("express");
const userController = require("../Controller/users");
const router = express.Router();
const auth = require("../middlewares/auth");
const Blogs = require("../Controller/blogs");

// >-------> USER <------<

// 1. register
router.post("/auth/register", userController.register);
// 2. login
router.post("/auth/login", userController.login);
// 3. logout
router.post("/auth/logout", auth, userController.logout);
// 4. refresh

// >-------> BLOG <------<
// 1. Create blog
router.post("/blog/create", auth, Blogs.CreateBlog);
// 2. get all blogs
router.get("/blog/all", auth, Blogs.getAll);
// 3. get by id
router.get("/blog/:id", auth, Blogs.getById);
// 4. get by cat
router.get("/blog/all/:cat", auth, Blogs.getByCat);
// 5. delete by id
router.delete("/blog/:id", auth, Blogs.deleteById);
// 6. update by id
router.put("/blog/:id", auth, Blogs.updateById);

module.exports = router;
