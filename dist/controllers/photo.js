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
exports.addPhoto = void 0;
const multer_1 = __importDefault(require("../utils/multer"));
const index_1 = require("../index");
const addPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singleUpload = multer_1.default.single('image');
    const { title } = req.body;
    const user = yield index_1.prisma.user.findUnique({
        where: {
            id: req.session.userId
        }
    });
    if (!user) {
        return res.status(401).json({
            success: false,
            errors: [{
                    field: "authorization",
                    message: "You must be logged in to continue."
                }]
        });
    }
    ;
    return singleUpload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        }
        ;
        const photo = yield index_1.prisma.photo.create({
            data: {
                title,
                imageUrl: req.file.location,
                author: {
                    connect: { id: user.id }
                }
            }
        });
        return res.status(201).json({
            success: true,
            data: photo
        });
    }));
});
exports.addPhoto = addPhoto;
//# sourceMappingURL=photo.js.map