import express from "express";
import messages from "../config/db.js";

const router = express.router();

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
})
