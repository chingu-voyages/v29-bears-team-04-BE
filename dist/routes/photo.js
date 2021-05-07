"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const photo_1 = require("../controllers/photo");
const router = express_1.default.Router({ mergeParams: true });
router.route("/add").post(photo_1.addPhoto);
router.route("/").get(photo_1.getAllPhotos);
router.route("/searchPhotos").post(photo_1.searchAllPhotos);
router.route("/getMyPhotos").post(photo_1.getMyPhotos);
router.route("/updatePhoto").post(photo_1.updatePhoto);
router.route("/deletePhoto").post(photo_1.deletePhoto);
exports.default = router;
//# sourceMappingURL=photo.js.map