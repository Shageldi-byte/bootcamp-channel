import { badRequest, resGenerator } from "../../../core/app.response.mjs";
import { db } from "../../../database/connection.mjs";
import { addCommentQuery, deleteCommentQuery, getSingleCommentQuery, updateCommentQuery } from "../../../database/v1.admin.query.mjs";

export function addComment(req,res){
    const userId = req.user.id;
    const videoId = req.params.videoId;
    const comment = req.body.comment;

    db.query(addCommentQuery,[comment,userId,videoId])
    .then(response=>{
        res.json(resGenerator(response.rows[0]));
    })
    .catch(err=>{
        badRequest(res);
    })
}



export async function checkIsOwnComment(req,res,next){
    const userId = req.user.id;
    const cId = req.params.cId;
    let isOwn = false;
    await db.query(getSingleCommentQuery,[cId])
    .then(result=>{
        if(result.rows.length && result.rows[0].user_id==userId){
            isOwn = true;
        }
    })

    if(isOwn){
        req.isOwn = isOwn;
        next();
    } else {
        badRequest(res);
    }
}

export function updateComment(req,res){
    if(req.isOwn){
        const cId = req.params.cId;
        const comment = req.body.comment;

        db.query(updateCommentQuery,[comment,cId])
        .then(response=>{
            res.json(resGenerator(response.rows[0]));
        })
        .catch(err=>{
            badRequest(res);
        })
    } else {
        badRequest(res);
    }
}

export function deleteComment(req,res){
    if(req.isOwn){
        const cId = req.params.cId;
        db.query(deleteCommentQuery,[cId])
        .then(result=>{
            res.json(resGenerator('success'));
        }).catch(err=>{
            console.log(err);
            badRequest(res);
        })
    } else {
        badRequest(res);
    }

}