import { compare } from "bcryptjs";
import { prisma } from "../prisma";
import { sign } from "jsonwebtoken";

interface SignRequest {
  email: string;
  password: string;
}

export class AuthenticationService {

  async login({ email, password }: SignRequest) {

    const user = await prisma.user.findFirst({
      where: { email }
    });

    if (!user) {
      throw new Error('User not found!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('E-mail/Password incorrect');
    }

    const token = sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { subject: user.id.toString(), expiresIn: '30d' }
    );

    return {
      id: user.id,
      email: user.email,
      token: token
    }

  }

}