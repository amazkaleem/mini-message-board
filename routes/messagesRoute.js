import express from "express";
import {
  getMessageDetailsByName,
  getMessageBoard,
  getForm,
  createMessage,
} from "../controllers/messageController.js";
import handleError from "../middleware/errorMiddleware.js";
import { body, validationResult, matchedData, param } from "express-validator";

const alphaErr = "must only contain letters";
const messageErr = "can be up to 100 characters only";
const nameErr = "can be upto to 20 characters only";

const validateUser = [
  body("authorName")
    .trim()
    .isAlpha()
    .withMessage(`Author Name ${alphaErr}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Name ${nameErr}`),
  body("messageText")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(`Message ${messageErr}`),
];

const router = express.Router();

router.get("/", getMessageBoard);

router.get("/new", getForm);

router.post("/new", [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        errors: errors.array()
      });
    }
    await createMessage(req, res);
  },
]);

router.get("/:messageText", getMessageDetailsByName);

router.use(handleError);

export default router;
