import fs from "fs";
import getMP3Duration  from "get-mp3-duration";
import multer from "multer";
import { badRequest } from "../../../core/app.response.mjs";
import { resGenerator } from "../../../core/app.response.mjs";
import { IMAGE_BASE_URL } from "../../../core/constant.mjs";
import { db } from "../../../database/connection.mjs";
import { addVideoQuery, deleteVideoQuery, getAllVideosQuery, getSingleVideoQuery, updateVideoQuery } from "../../../database/v1.admin.query.mjs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/video')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+'-'+file.originalname);
  }
})

export const uploadVideo = multer({ storage: storage })

export function addVideo(req,res){
    const poster = req.files.poster[0];
    const videoFile = req.files.video[0];
    const userId = req.user.id;
    const buffer = fs.readFileSync(videoFile.path)
    const duration = getMP3Duration(buffer);
    let d = new Date(duration).toISOString().slice(11, 19);
    const {
        title, 
        description,  
        category_id
    } = req.body;

   

    db.query(addVideoQuery,[
        title, description, poster.filename, videoFile.filename, userId, category_id, d
    ]).then(result=>{
        res.json(resGenerator(result.rows[0]));
    })
    .catch(err=>{
        console.log(err);
        badRequest(res);
    })



}

export function getAllVideos(req,res){
  db.query(getAllVideosQuery)
  .then(result=>{
    res.json(resGenerator(result.rows));
  })
  .catch(err=>{
    badRequest(res);
  })
}

export function updateVideo(req,res){
    const isFileHas = typeof req.files !== 'undefined' && req.files !== null;
    const poster = isFileHas && req.files.poster && req.files.poster.length>0? req.files.poster[0] : null;
    const videoFile = isFileHas && req.files.video && req.files.video.length>0? req.files.video[0] : null;
    const userId = req.user.id;

    let query = updateVideoQuery;

     const {
        title, 
        description,  
        category_id
    } = req.body;

    let values = [title,description,category_id];

    let index = 3;

    if(videoFile!=null){
      const buffer = fs.readFileSync(videoFile.path)
      const duration = getMP3Duration(buffer);
      let d = new Date(duration).toISOString().slice(11, 19);
      index+=2;
      query+=` ,video_url=$4, duration=$5 `;
      values.push(videoFile.filename);
      values.push(d);
    }

    if(poster!=null){
      index++;
      query+=` ,poster=$${index} `;
      values.push(poster.filename);
    }

    index++;
    query+=` WHERE id=$${index} RETURNING *;`;
    values.push(req.params.id);


       

   

    db.query(query,values).then(result=>{
        res.json(resGenerator(result.rows[0]));
    })
    .catch(err=>{
        console.log(err);
        badRequest(res);
    })



}

export function getVideoDetails(req, res, next){
  const id = req.params.id;
  db.query(getSingleVideoQuery,[id])
  .then(result=>{
    if(result.rows.length){
      req.video = result.rows[0];
      next();
    } else {
      res.status(404).send('Video not found');
    }
  })
  .catch(err=>{
    badRequest(res);
  })
}

export async function deleteVideo(req,res){
  await fs.unlink(`public/video/${req.video.poster}`,()=>{});
  await fs.unlink(`public/video/${req.video.video_url}`,()=>{});

  db.query(deleteVideoQuery,[req.params.id])
  .then(result=>{
    res.json(resGenerator('success'));
  })
  .catch(err=>{
    console.log(err);
    badRequest(res);
  })
}

