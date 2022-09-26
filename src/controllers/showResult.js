import { db, ObjectId } from "../database.js";

async function showResult(req, res) {
    const { id } = req.params;
    try {
        const poll = await db.collection('polls').findOne({ _id: ObjectId(id) });
        if (!poll) { return res.sendStatus(404) }

        const choices = await db.collection('choices').find({ pollId: id }).toArray();
        const choicesId = choices.map(element => {
            return element._id
        });
        let topRatedId;
        let numberOfvotes = 0;
        const arrays = await choicesId.forEach( async element => {
            const arrayVotes = await db.collection('votes').find({ choiceId: element}).toArray();
            console.log(element,arrayVotes);
            if(arrayVotes.length >= numberOfvotes){
                topRatedId = element;
                numberOfvotes = arrayVotes.length
                console.log(topRatedId,numberOfvotes)
            }
        });
        console.log(arrays, "here")
        const topRatedChoice = await db.collection('choices').findOne({_id: ObjectId(topRatedId)})
        const resultPoll = {
            _id: id,
            title: poll.title,
            expireAt: poll.expireAt,
            result: {
                title: topRatedChoice.title,
                votes: numberOfvotes
            }
        }

        res.status(200).send(resultPoll)
    } catch (error) {
        console.log(error);
        res.sendStatus(422)
    }

} export { showResult }