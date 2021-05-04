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
exports.deletePhoto = exports.updatePhoto = exports.getMyPhotos = exports.searchAllPhotos = exports.getAllPhotos = exports.addPhoto = void 0;
const multer_1 = __importDefault(require("../utils/multer"));
const index_1 = require("../index");
const checkSession_1 = require("../utils/checkSession");
const addPhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singleUpload = multer_1.default.single("image");
    const { title } = req.body;
    const user = yield index_1.prisma.user.findUnique({
        where: {
            id: req.session.userId,
        },
    });
    if (!user) {
        return res.status(401).json({
            success: false,
            errors: {
                field: "authorization",
                message: "You must be logged in to continue.",
            },
        });
    }
    return singleUpload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: err,
            });
        }
        const photo = yield index_1.prisma.photo.create({
            data: {
                title,
                imageUrl: req.file.location,
                author: {
                    connect: { id: user.id },
                },
            },
        });
        return res.status(201).json({
            success: true,
            photo,
        });
    }));
});
exports.addPhoto = addPhoto;
const getAllPhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photos = yield index_1.prisma.photo.findMany();
        return res.status(200).json({
            success: true,
            photos,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
            message: "Photo retrieval failed",
        });
    }
});
exports.getAllPhotos = getAllPhotos;
const searchAllPhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photos = yield index_1.prisma.photo.findMany({
            where: {
                title: {
                    contains: req.body.searchString,
                },
            },
        });
        return res.status(200).json({
            success: true,
            photos,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
        });
    }
});
exports.searchAllPhotos = searchAllPhotos;
const getMyPhotos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.userId) {
        return res.status(401).json({
            success: false,
            error: {
                field: "session",
                message: "Your session has expired, please login again.",
            },
        });
    }
    try {
        const photos = yield index_1.prisma.user.findUnique({
            where: {
                id: req.session.userId,
            },
            select: {
                photos: true,
                id: false,
                email: false,
                password: false,
                name: false,
            },
        });
        return res.status(200).json({
            success: true,
            photos,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
        });
    }
});
exports.getMyPhotos = getMyPhotos;
const updatePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    checkSession_1.checkSessionExpired(req, res);
    const { id, title } = req.body;
    try {
        const user = yield index_1.prisma.user.update({
            where: {
                id: req.session.userId,
            },
            data: {
                photos: {
                    update: {
                        where: {
                            id: id,
                        },
                        data: {
                            title: title,
                        },
                    },
                },
            },
            select: {
                id: false,
                email: false,
                password: false,
                name: false,
                photos: {
                    where: {
                        id: id,
                    },
                },
            },
        });
        return res.status(200).json({
            success: true,
            message: "Photo update succeeded",
            user,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: err,
            message: "Photo update failed",
        });
    }
});
exports.updatePhoto = updatePhoto;
const deletePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    checkSession_1.checkSessionExpired(req, res);
    try {
        const photo = yield index_1.prisma.photo.deleteMany({
            where: {
                AND: [
                    {
                        id: req.body.id,
                    },
                    {
                        authorId: req.session.userId,
                    },
                ],
            },
        });
        return res.status(200).json({
            success: true,
            message: "photo deleted",
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
        });
    }
});
exports.deletePhoto = deletePhoto;
//# sourceMappingURL=photo.js.map