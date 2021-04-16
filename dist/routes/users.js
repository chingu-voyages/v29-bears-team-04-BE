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
    .post(users_1.registerUser)
    .get(users_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=users.js.map