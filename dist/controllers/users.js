"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.me = exports.logout = exports.login = exports.registerUser = void 0;
const index_1 = require("../index");
const argon2_1 = __importDefault(require("argon2"));
const constants_1 = require("../constants");
<<<<<<< HEAD
const checkSession_1 = require("../utils/checkSession");
=======
const checkSessionExpired = (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({
            success: false,
            error: {
                field: "session",
                message: "Your session has expired, please login again."
            }
        });
    }
    ;
};
>>>>>>> 490312a885033417524972fed45373d85ac0ccdb
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedPassword = yield argon2_1.default.hash(password);
    try {
        const newUser = yield index_1.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        req.session.userId = newUser.id;
        return res.status(201).json({
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(409);
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield index_1.prisma.user.findUnique({
            where: {
                email,
            }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                errors: {
                    message: "Email incorrect/Email not found.",
                    field: "email"
                }
            });
        }
        ;
        const isValid = yield argon2_1.default.verify(user.password, password);
        if (!isValid) {
            return res.status(401).json({
                success: false,
                errors: {
                    message: "Incorrect password",
                    field: "password"
                }
            });
        }
        ;
        req.session.userId = user.id;
        return res.status(200).json({
            success: true
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
        });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        req.session.destroy((err) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                resolve(false);
                return res.status(500).json({
                    error: err
                });
            }
            resolve(true);
            return res.status(200).json({
                success: true
            });
        });
    });
});
exports.logout = logout;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
    checkSession_1.checkSessionExpired(req, res);
=======
    checkSessionExpired(req, res);
>>>>>>> 490312a885033417524972fed45373d85ac0ccdb
    try {
        const user = yield index_1.prisma.user.findUnique({
            where: {
                id: req.session.userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
            }
        });
        return res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        });
    }
});
exports.me = me;
const getAllUsers = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { res } = args;
    try {
        const users = yield index_1.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
            }
        });
        return res.status(200).json({
            success: true,
            data: users
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        });
    }
});
exports.getAllUsers = getAllUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
    checkSession_1.checkSessionExpired(req, res);
=======
    checkSessionExpired(req, res);
>>>>>>> 490312a885033417524972fed45373d85ac0ccdb
    try {
        const user = yield index_1.prisma.user.update({
            data: Object.assign({}, req.body),
            where: {
                id: req.session.userId
            },
<<<<<<< HEAD
            select: {
                email: true,
                name: true,
                id: true,
                password: false
            }
        });
        return res.status(200).json({
            success: true,
            message: 'user information updated',
            user,
=======
        });
        return res.status(200).json({
            success: true,
            message: 'user information updated'
>>>>>>> 490312a885033417524972fed45373d85ac0ccdb
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
<<<<<<< HEAD
    checkSession_1.checkSessionExpired(req, res);
=======
    checkSessionExpired(req, res);
>>>>>>> 490312a885033417524972fed45373d85ac0ccdb
    try {
        const user = yield index_1.prisma.user.delete({
            where: {
                id: req.session.userId
            },
        });
        return res.status(200).json({
            success: true,
            message: 'user deleted'
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map