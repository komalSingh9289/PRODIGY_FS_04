import { allMessages, sendMessage } from "../Controllers/messageControllers.js";
import express from "express";
import protectRoute from "../Middleware/protectRoute.js";

const router = express.Router();

router.post('/send/:id', protectRoute, sendMessage);

router.get('/:id',protectRoute, allMessages);


export default router;