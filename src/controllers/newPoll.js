import { db, ObjectId } from "../database.js";
import baseJoi from 'joi';
import joiDate from '@joi/date';
const joi = baseJoi.extend(joiDate);
import dayjs from 'dayjs';


async function newPoll(req, res) {
    try {
        const poll = req.body;

        const pollSchema = joi.object({
            title: joi.string().required(),
            expireAt: joi.date().format('YYYY-MM-DD HH:mm').utc()
        })
        const validation = pollSchema.validate(poll);
        if (validation.error) {
            return res.status(422).send("Schema error")
        }
        if (!poll.expireAt) {
            const day = dayjs().format("DD");
            let month = parseInt(dayjs().format("MM"));
            let year = parseInt(dayjs().format("YYYY"));
            if (month == "12") {
                month = "01";
                const aux = parseInt(year) + 1;
                year = aux.toString();
            } else {
                if(month == '09'){
                    month = "10"
                } else{
                    const aux = parseInt(month[1]) + 1;
                    month[1] = aux.toString()
                }
            }
            poll.expireAt = year + "-" + month + "-" + day;
        }

        await db.collection("polls").insertOne(poll);
        res.sendStatus(201);
    } catch (error) { console.log(error); res.status(422).send(error) }
}
export { newPoll }