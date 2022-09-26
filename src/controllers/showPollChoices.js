import { db, ObjectId } from "../database.js";

async function showPollChoices(req,res){
    const {id} = req.params;
    try{
        const poll = await db.collection('polls').findOne({_id: ObjectId(id)});
        if(!poll){
            return res.sendStatus(404);
        }
        
        const choices = await db.collection('choices').find({pollId: id}).toArray();
        res.status(200).send(choices)
    } catch(error){
        console.log(error);
        res.sendStatus(422);
    }
}
export {showPollChoices}