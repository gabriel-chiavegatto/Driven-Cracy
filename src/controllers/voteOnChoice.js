import {db, ObjectId} from "../database.js";
import dayjs from 'dayjs';
async function voteOnChoice(req,res){
    const {id} = req.params;
    const hour = dayjs().format("YYYY-MM-DD HH:mm");
    console.log(hour)
    try{
        const choice = await db.collection('choices').findOne({_id: ObjectId(id)});
        if(!choice){
            return res.sendStatus(404);
        }

        // validar se já expirou a enquete

        const vote = {
            createdAt: hour,
            choiceId: ObjectId(id)
        }
        await db.collection('votes').insertOne(vote)

        res.sendStatus(201)
    }catch(error){
        console.log(error);
        res.sendStatus(422);
    }
}
export {voteOnChoice}