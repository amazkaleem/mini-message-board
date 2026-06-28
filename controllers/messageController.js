import CustomNotFoundError from "../errors/customNotFoundError.js";
import { getMessageDetails } from "../config/db.js";

async function getMessageDetailsByName(req, res) {
  const { messageText } = req.params;

  const messageDetails = await getMessageDetails(messageText);

  if (!messageDetails) {
    throw new CustomNotFoundError("Message not found");
  }

  res.render("messageDetails", { message: messageDetails });
}

export default getMessageDetailsByName;
