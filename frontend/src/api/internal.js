import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

const internal = {
    // >------> user api starts <-------<

    async register(data) {
        let response;
        try {
            response = await api.post("/auth/register", data);
        } catch (error) {
            return error;
        }
        return response;
    },
    async login(data) {
        let response;
        try {
            response = await api.post("/auth/login", data);
        } catch (error) {
            return error;
        }
        return response;
    },
    async logout() {
        let response;
        try {
            response = await api.post("/auth/logout");
        } catch (error) {
            return error;
        }
        return response;
    },

    // >------> user api ends <-------<

    // >--------> blog api starts <-------<

    async createBlog(data) {
        let response;
        try {
            response = await api.post("/blog/create", data);
        } catch (error) {
            return error;
        }
        return response;
    },

    async getAll(cat) {
        let response;

        try {
            response = await api.get(`/blog/all${cat}`);
        } catch (error) {
            console.log("Internal > getAll", error);
            return error;
        }
        return response;
    },

    async getById(data) {
        let response;

        try {
            response = await api.get(`/blog/${data}`);
        } catch (error) {
            return error;
        }
        return response;
    },

    async getByCat(cat) {
        let response;

        try {
            response = await api.get(`/blog/all/${cat}`);
        } catch (error) {
            return error;
        }
        return response;
    },

    async deleteById(id) {
        let response;
        try {
            response = await api.delete(`/blog/${id}`);
        } catch (error) {
            return error;
        }
        return response;
    },

    async updateBlog(data, blogId) {
        let response;
        try {
            response = await api.put(`/blog/${blogId}`, data);
        } catch (error) {
            console.log("[UPDATE_BLOG]", error);
            return error;
        }
        return response;
    },

    // >--------> blog api ends <-------<
};

export default internal;
