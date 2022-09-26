import joi from 'joi';
import { db, ObjectId } from '../database.js';

async function addChoice(req,res){
    try{
        const choice = req.body;

        const choiceSchema = joi.object({
            title: joi.string().required(),
            pollId: joi.required()
        });
        const validation = choiceSchema.validate(choice);
        if(validation.error){
            return res.sendStatus(422);
        }

        const poll = await db.collection('polls').findOne({_id: ObjectId(choice.pollId)});
        if(!poll){
            return res.sendStatus(404);
        }
        const haveThisChoice = await db.collection('choices').findOne({title: choice.title, pollId: choice.pollId})
        if(haveThisChoice){
            return res.sendStatus(409);
        }

        // VER SE A ENQUETE JA EXPIROU

        await db.collection('choices').insertOne(choice)

        res.sendStatus(201)
    }catch(error){
        console.log(error);
        res.sendStatus(422);
    }
}
export {addChoice}