import { Router } from "express";
import { newPoll } from "./controllers/newPoll.js";
import { pollList} from "./controllers/pollList.js";

const router = Router();

router.post('/poll', newPoll);
router.get('/poll', pollList);

export default router;