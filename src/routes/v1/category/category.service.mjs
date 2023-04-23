import { badRequest, resGenerator } from "../../../core/app.response.mjs";
import { db } from "../../../database/connection.mjs";
import { addCategoryQuery, deleteCategoryQuery, getAllCategoryQuery, updateCategoryQuery } from "../../../database/v1.admin.query.mjs";

export function addCategory(req,res){
    const {
        name_tm,
        name_en
    } = req.body;
    db.query(addCategoryQuery,[name_tm,name_en])
    .then(result=>{
        if(result.rows.length>0){
            res.json(resGenerator(result.rows[0]));
        } else {
            badRequest(res);
        }
    })
    .catch(err=>{
        badRequest(res);
    })
}

export function updateCategory(req,res){
    const {
        name_tm,
        name_en
    } = req.body;
    db.query(updateCategoryQuery,[name_tm,name_en,req.params.id])
    .then(result=>{
        if(result.rows.length>0){
            res.json(resGenerator(result.rows[0]));
        } else {
            badRequest(res);
        }
    })
    .catch(err=>{
        badRequest(res);
    })
}

export function deleteCategory(req, res){
    db.query(deleteCategoryQuery,[req.params.id])
    .then(result=>{
        res.json(resGenerator('deleted'));
    })
    .catch(err=>{
        badRequest(res);
    })
}

export function getCategory(req, res){
    db.query(getAllCategoryQuery)
    .then(result=>{
        res.json(result.rows);
    })
    .catch(err=>{
        badRequest(res);
    })
}