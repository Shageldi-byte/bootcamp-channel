import format from "pg-format";
import { badRequest, resGenerator } from "../../../core/app.response.mjs";
import { db } from "../../../database/connection.mjs";
import { addTagsQuery, deleteTagQuery, updateTagsQuery } from "../../../database/v1.admin.query.mjs";

export function addTags(req,res){
    const videoId = req.params.videoId;
    const tags = req.body.tags;
    const formattedTags = tags.map(tag => tag.startsWith('#')? tag: `#${tag}`);
    let values = [];
    formattedTags.forEach((it,i)=>{
        values.push([it,videoId]);
    })
    db.query(format(addTagsQuery,values))
    .then(result=>{
        res.json(resGenerator(result.rows));
    }).catch(err=>{
        badRequest(res);
    })
}

export function updateTag(req,res){
    const id = req.params.tagId;
    let {
        text
    } = req.body;

    text = text.startsWith('#')?text:`#${text}`;

    db.query(updateTagsQuery,[text,id])
    .then(result=>{
        res.json(resGenerator(result.rows[0]));
    })
    .catch(err=>{
        badRequest(res);
    })
}

export function deleteTag(req,res){
    db.query(deleteTagQuery,[req.params.tagId])
    .then(result=>{
        res.json(resGenerator('success'));
    })
    .catch(err=>{
        badRequest(res);
    })
}