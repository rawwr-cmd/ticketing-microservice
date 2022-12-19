import express, { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { Password } from "../services/password";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    //gives boolean
    const passwordsMatch = await Password.verifyPassword(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    //generate json web token
    const userJwt = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser.id,
      },
      process.env.JWT_KEY!,
      { expiresIn: "1h" }
    );

    //store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(existingUser);
  }
);

export { router as signinRouter };
