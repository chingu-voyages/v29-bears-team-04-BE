"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const router = express_1.default.Router({ mergeParams: true });
router
    .route('/')
    .get(users_1.getAllUsers);
router
    .route('/register')
    .post(users_1.registerUser);
router
    .route('/login')
    .post(users_1.login);
router
    .route('/logout')
    .post(users_1.logout);
router
    .route('/me')
    .get(users_1.me);
router
    .route('/update')
    .post(users_1.updateUser);
router
    .route('/delete')
    .post(users_1.deleteUser);
router
    .route('/search')
    .post(users_1.searchAllUsers);
exports.default = router;
//# sourceMappingURL=users.js.map