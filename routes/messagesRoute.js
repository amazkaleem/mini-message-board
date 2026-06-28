import express from "express";
import { messages } from "../config/db.js";
import getMessageDetailsByName from "../controllers/messageController.js";
import handleError from "../middleware/errorMiddleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

router.get("/new", (req, res) => {
    res.render("form");
});

router.post("/new", (req, res) => {
    const { messageText, authorName } = req.body;
    messages.push({ text: messageText, user: authorName, added: new Date() });
    res.redirect("/");
});

router.get("/:messageText", getMessageDetailsByName);

router.use(handleError);

export default router;
