import CustomNotFoundError from "../errors/customNotFoundError.js";
import {
  insertMessage,
  getMessageDetails,
  getAllMessages,
} from "../db/queries.js";
import { matchedData } from "express-validator";

export async function getMessageDetailsByName(req, res) {
  const { messageText } = req.params;

  const messageDetails = await getMessageDetails(messageText);
  const message = messageDetails[0];

  console.log(message);

  if (!message) {
    throw new CustomNotFoundError("Message not found");
  }

  res.render("messageDetails", { message: message });
}

export async function getMessageBoard(req, res) {
  const messages = await getAllMessages();
  res.render("index", { title: "Mini Messageboard", messages: messages });
}

export async function getForm(req, res) {
  res.render("form");
}

export async function createMessage(req, res) {
  const { messageText, authorName } = matchedData(req);
  await insertMessage(messageText, authorName);
  res.redirect("/");
}
