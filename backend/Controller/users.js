const Joi = require("joi");
const bcrypt = require("bcryptjs");
const userModel = require("../model/users");
const jwtService = require("../Services/JWT");
const userLoginDTO = require("../DTO/userLogin");
const userRegister = require("../DTO/userRegister");
const tokenModel = require("../model/token");

const authController = {
    async register(req, res, next) {
        const userSchema = Joi.object({
            name: Joi.string().required().min(5).max(16),
            username: Joi.string().required().min(5).max(16),
            email: Joi.string().required(),
            password: Joi.string().required().min(8).max(16),
            confirmPassword: Joi.ref("password"),
        });
        const { error } = userSchema.validate(req.body);
        // if error in validation then return error via middleware
        if (error) {
            return next(error);
        }

        const { name, username, email, password } = req.body;

        // if email is already existed then return error

        try {
            const isUserNameAlreadyUsed = await userModel.exists({ username });

            if (isUserNameAlreadyUsed) {
                const data = { status: 409, message: "username already used" };
                return next(data);
            }

            const isEmailAlreadyUsed = await userModel.exists({ email });

            if (isEmailAlreadyUsed) {
                const data = { status: 409, message: "email already used" };
                return next(data);
            }
        } catch (error) {
            return next(error);
        }
        // password hash
        let hashPassword;
        try {
            const bcryptSalt = (await bcrypt.genSalt(10)).toString();
            hashPassword = await bcrypt.hash(password, bcryptSalt);
        } catch (error) {
            return next(error);
        }
        // store user in DB
        let userToSave;
        let user;
        try {
            userToSave = await userModel({
                name,
                username,
                email,
                password: hashPassword,
            });

            user = await userToSave.save();
        } catch (error) {
            return next(error);
        }

        // send token via cookie
        let accessToken;
        let refreshToken;
        try {
            accessToken = jwtService.signAccessToken(
                { userId: user._id },
                "60m"
            );
            refreshToken = jwtService.signRefreshToken(
                { userId: user._id },
                "60m"
            );
        } catch (error) {
            return next(error);
        }

        res.cookie("accessToken", accessToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });
        res.cookie("refreshToken", refreshToken, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
        });

        // save token in db
        const refreshTokenToSave = tokenModel({
            token: refreshToken,
            userId: user._id,
        });
        try {
            await refreshTokenToSave.save();
        } catch (error) {
            return next(error);
        }

        const userRegisterDTO = new userRegister(user);

        // return response
        return res.status(201).json({ auth: true, user: userRegisterDTO });
    },

    async login(req, res, next) {
        const userSchema = new Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        });

        const { error } = userSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { email, password } = req.body;

        let user;

        try {
            user = await userModel.findOne({ email });

            if (!user) {
                return res.status(401).json("invalid email");
            }

            if (!(await bcrypt.compare(password, user.password))) {
                return res.status(400).json("invalid password");
            }
        } catch (error) {
            return next(error);
        }
        try {
            const accessToken = jwtService.signAccessToken(
                { userId: user._id },
                "60m"
            );
            const refreshToken = jwtService.signRefreshToken(
                { userId: user._id },
                "60m"
            );

            res.cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
            });
            res.cookie("refreshToken", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true,
            });

            // store token in db

            const token = tokenModel({ token: refreshToken, userId: user._id });
            await token.save();
        } catch (error) {
            return next(error);
        }

        const userDTO = new userLoginDTO(user);

        res.status(200).json({ auth: true, user: userDTO });
    },

    async logout(req, res, next) {
        // delete token from db

        const { refreshToken } = req.cookies;
        try {
            await tokenModel.deleteOne({
                token: refreshToken,
            });
        } catch (error) {
            return next(error);
        }

        // delete cookie from client side
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({ auth: false, user: null });
    },
};

module.exports = authController;
