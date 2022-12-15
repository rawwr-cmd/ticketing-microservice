import { hash, compare } from "bcryptjs";

export class Password {
  static toHash = async (password: string) => {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  };

  static verifyPassword = async (password: string, passwordHash: string) => {
    const isMatch = await compare(password, passwordHash);
    return isMatch;
  };
}
