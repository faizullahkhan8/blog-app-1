const userDTO = require("../DTO/userLogin");
const jwtService = require("../Services/JWT");
const userModel = require("../model/users");

const auth = async (req, res, next) => {
    const { refreshToken, accessToken } = req.cookies;

    if (!refreshToken || !accessToken) {
        return res.status(401).json("Unauthorized");
    }
    let _id;
    try {
        _id = jwtService.verifyAccessToken(accessToken).userId;
    } catch (error) {
        return next(error);
    }

    let user;
    try {
        user = await userModel.findOne({ _id: _id });
        const DTO = new userDTO(user);
        user = DTO;
    } catch (error) {
        return next(error);
    }

    req.user = user;

    next();
};

module.exports = auth;
