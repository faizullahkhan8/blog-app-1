const jwt = require("jsonwebtoken");
const tokenModel = require("../model/token");

const {
    ACCESS_TOKEN_SECRET_KEY,
    REFRESH_TOKEN_SECRET_KEY,
} = require("../config/index");

class JWTService {
    static signAccessToken(payload, expiryTime) {
        return jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: expiryTime,
        });
    }
    static signRefreshToken(payload, expiryTime) {
        return jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: expiryTime,
        });
    }
    static verifyAccessToken(token) {
        return jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    }
    static verifyRefreshToken(token) {
        return jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
    }
    static async storeRefreshToken(token, userId) {
        try {
            const tokenToSave = new tokenModel({ token, userId });
            await tokenToSave.save();
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteRefreshToken(userId) {
        try {
            await tokenModel.deleteOne({ userId });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = JWTService;
