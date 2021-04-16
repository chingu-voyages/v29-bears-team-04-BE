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
exports.getAllUsers = exports.registerUser = void 0;
const index_1 = require("../index");
const argon2_1 = __importDefault(require("argon2"));
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
            data: newUser,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(409);
    }
});
exports.registerUser = registerUser;
const getAllUsers = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { res } = args;
    const users = yield index_1.prisma.user.findMany();
    res.send(users);
});
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=users.js.map