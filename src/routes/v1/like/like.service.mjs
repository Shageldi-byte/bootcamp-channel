import { badRequest, resGenerator } from "../../../core/app.response.mjs";
import { LIKE_TYPE } from "../../../core/constant.mjs";
import { db } from "../../../database/connection.mjs";
import { addLikeQuery, deleteReverseLikeQuery } from "../../../database/v1.admin.query.mjs";

export async function addLike(req,res){
    const userId = req.user.id;
    const videoId = req.params.videoId;
    const type = req.body.type;
    let rType = LIKE_TYPE.dislike;
    
    if(type === LIKE_TYPE.dislike){
        rType = LIKE_TYPE.like;
    }

    await db.query(deleteReverseLikeQuery,[videoId,userId])
    .then(result=>{
    })

    await db.query(addLikeQuery,[type,userId,videoId])
    .then(result=>{
        res.json(resGenerator(result.rows[0]));
    })
    .catch(err=>{
        badRequest(res);
    })



}

export function removeLike(req,res){
    const userId = req.user.id;
    const videoId = req.params.videoId;
    db.query(deleteReverseLikeQuery,[videoId,userId])
    .then(result=>{
        res.json(resGenerator('success'));
    })
    .catch(err=>{
        badRequest(res);
    })
}