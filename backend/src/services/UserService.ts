import { hash, hashSync } from "bcryptjs";
import { prisma } from "../prisma";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileId: string;
}

export class UserService {

  async create({ name, email, password, confirmPassword, profileId }: User) {
    const userExists = await prisma.user.findFirst({
      where: { email}
    });
    if (userExists) {
      throw new Error('Usuário já cadastrado!');
    }
    const hashPassword = await hash(password, 8);
    if (password !== confirmPassword) {
      throw new Error('Senhas não conferem!');
    }
    return await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        profileId
      },
      select: { id: true, name: true, email: true, profile: true }
    });
  }

}