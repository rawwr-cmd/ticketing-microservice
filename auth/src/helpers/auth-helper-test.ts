import request from "supertest";
import { app } from "../app";

let globalWithSignIn = global as typeof globalThis & {
  signup(): Promise<string[]>;
};

//or use this instead of the above
// declare global {
//   var signin: () => Promise<string[]>;
// }

globalWithSignIn.signup = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};

export { globalWithSignIn as global };
