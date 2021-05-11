import express from "express";
import {
  addPhoto,
  getAllPhotos,
  searchAllPhotos,
  getMyPhotos,
  updatePhoto,
  deletePhoto,
  getCategoryPhotos
} from "../controllers/photo";
const router = express.Router({ mergeParams: true });

router.route("/add").post(addPhoto);

router.route("/").get(getAllPhotos);

router.route("/searchPhotos").post(searchAllPhotos);

router.route("/getMyPhotos").post(getMyPhotos);

router.route("/getCategoryPhotos").post(getCategoryPhotos);

router.route("/updatePhoto").post(updatePhoto);

router.route("/deletePhoto").post(deletePhoto);

export default router;
