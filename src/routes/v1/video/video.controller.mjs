import express from "express";
import { authenticateToken, checkIsAdmin } from "../auth/jwt.service.mjs";
import { addVideo, deleteVideo, getAllVideos, getSingleVideo, getVideoDetails, updateVideo, uploadVideo } from "./video.service.mjs";

const videoController = express.Router();
videoController.post(
    '/add-video',
    authenticateToken,
    checkIsAdmin,
    uploadVideo.fields([{name: 'poster',maxCount:1},{name: 'video',maxCount:1}]),
    addVideo);

videoController.get('/get-all-videos',getAllVideos);

videoController.put(
    '/update-video/:id',
    authenticateToken,
    checkIsAdmin,
    uploadVideo.fields([{name: 'poster',maxCount:1},{name: 'video',maxCount:1}]),
    updateVideo);

videoController.patch(
    '/delete-video/:id',
    authenticateToken,
    checkIsAdmin,
    getVideoDetails,
    deleteVideo
    )

videoController.get('/get-single-video/:id',getSingleVideo);

export default videoController;