import { Router } from "express";
import { newPoll } from "./controllers/newPoll.js";
import { pollList } from "./controllers/pollList.js";
import { addChoice } from "./controllers/addChoice.js";
import { showPollChoices } from "./controllers/showPollChoices.js";
import { voteOnChoice } from "./controllers/voteOnChoice.js";
import { showResult } from "./controllers/showResult.js";
import { helloWorld } from "./controllers/helloWord.js";

const router = Router();

router.get('/', helloWorld);
router.post('/poll', newPoll);
router.get('/poll', pollList);
router.post('/choice', addChoice);
router.get('/poll/:id/choice', showPollChoices);
router.post('/choice/:id/vote', voteOnChoice);
router.get('/poll/:id/result', showResult);

export default router;