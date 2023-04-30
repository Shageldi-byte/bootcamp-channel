import { badRequest, resGenerator } from "../../../core/app.response.mjs";
import { db } from "../../../database/connection.mjs";
import { searchVideoQuery } from "../../../database/v1.admin.query.mjs";

export function search(req,res){
    const searchText = req.query.search;
    db.query(searchVideoQuery,[searchText])
    .then(result=>{
        res.json(resGenerator(result.rows));
    })
    .catch(err=>{
        badRequest(res);
    })

    
}