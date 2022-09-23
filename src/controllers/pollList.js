import {db, ObjectId} from "../database.js";

async function pollList(req,res){
    try{
        const polls = await db.collection('polls').find().toArray();
        res.status(200).send(polls);
    }catch(error){
        console.log(error);
        res.sendStatus(422)
    }
}
export {pollList}