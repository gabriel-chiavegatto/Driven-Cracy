import { Router } from "express";
import { addChoice } from "./controllers/addChoice.js";
import { newPoll } from "./controllers/newPoll.js";
import { pollList } from "./controllers/pollList.js";
import { showPollChoices } from "./controllers/showPollChoices.js";

const router = Router();

router.post('/poll', newPoll);
router.get('/poll', pollList);
router.post('/choice', addChoice);
router.get('/poll/:id/choice', showPollChoices);

export default router;