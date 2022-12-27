import * as bcryptjs from "bcryptjs"; // Implicit any

export class Password {
  static toHash = async (password: string) => {
    const hashedPassword = await bcryptjs.hash(password, 12);
    return hashedPassword;
  };

  static verifyPassword = async (password: string, passwordHash: string) => {
    const isMatch = await bcryptjs.compare(password, passwordHash);
    return isMatch;
  };
}
