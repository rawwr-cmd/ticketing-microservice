import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-errors";
import { DatabaseConnectionerror } from "../errors/database-connection-errors";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5, max: 20 })
      .isAlphanumeric()
      .trim(),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    // console.log(errors);
    // Result {
    //    formatter: [Function: formatter],
    //    errors: [
    //      {
    //        value: 'akshay@gmailcom',
    //        msg: 'Please enter a valid email addressil address.',                                        .',
    //        param: 'email',
    //        location: 'body'
    //      }
    //    ]
    //  }

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    console.log("Creating a user...");

    throw new DatabaseConnectionerror();

    res.send({});
  }
);

export { router as signupRouter };
