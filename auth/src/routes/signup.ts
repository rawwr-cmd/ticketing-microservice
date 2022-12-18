import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Please enter a valid email address."),
    body("password")
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage("Password must be between 5 and 20 characters."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
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

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({
      email,
      password,
    });

    await user.save();

    //generate json web token
    const userJwt = jwt.sign(
      {
        email: user.email,
        id: user.id,
      },
      process.env.JWT_KEY!,
      { expiresIn: "1h" }
    );

    //store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };

// const person = {name : 'akshay'}
// undefined
// JSON.stringify(person)
// '{"name":"akshay"}'

// const person = {name : 'akshay', toJSON() {return 'hi there'}}
// undefined
// JSON.stringify(person)
// '"hi there"'
