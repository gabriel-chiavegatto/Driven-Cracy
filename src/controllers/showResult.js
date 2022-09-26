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

        const rated = await findTheTopRatedChoice(choicesId)

        console.log(rated, "here")

        const topRatedChoice = await db.collection('choices').findOne({ _id: ObjectId(rated.resultOfRated) })
        const resultPoll = {
            _id: id,
            title: poll.title,
            expireAt: poll.expireAt,
            result: {
                title: topRatedChoice.title,
                votes: rated.numberOfvotes
            }
        }

        res.status(200).send(resultPoll)
    } catch (error) {
        console.log(error);
        res.sendStatus(422)
    }

} export { showResult }

async function findTheTopRatedChoice(choicesId) {
    try {
        let topRatedId;
        let numberOfvotes = 0;
        const choiceLength = choicesId.length;

        for (let i = 0; i < choicesId.length; i++) {
            const arrayVotes = await db.collection('votes').find({ choiceId: choicesId[i] }).toArray();
            console.log(choicesId[i], arrayVotes);
            if (arrayVotes.length >= numberOfvotes) {
                topRatedId = choicesId[i];
                numberOfvotes = arrayVotes.length;
            }
        }
        const resultOfRated = topRatedId;
        
        return { resultOfRated, numberOfvotes }

        // const topRatedArray = await choicesId.map(async element => {
        //     try {
        //         const arrayVotes = await db.collection('votes').find({ choiceId: element }).toArray();
        //         console.log(element, arrayVotes);
        //         if (arrayVotes.length >= numberOfvotes) {
        //             topRatedId = element;
        //             numberOfvotes = arrayVotes.length;
        //             return topRatedId
        //         } else { return topRatedId }

        //     } catch (error) {
        //         return "Mongo ERROR"
        //     }
        // });

    } catch (error) {
        console.log("error on findTheTopRatedChoice", error)
    }

}