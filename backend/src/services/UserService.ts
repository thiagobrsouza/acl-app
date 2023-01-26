import { hash } from "bcryptjs";
import { ConflictException } from "../middlewares/handleError";
import { prisma } from "../prisma";

interface UserRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileId: number;
}

export class UserService {

  /**
   * create
   */
  async create({ name, email, password, confirmPassword, profileId }: UserRequest) {

    const exists = await prisma.user.findFirst({
      where: { email }
    });

    if (exists) {
      throw new ConflictException('Email already registered');
    }

    const hashPassword = await hash(password, 8);

    if (password !== confirmPassword) {
      throw new Error('Passwords not matches!');
    }

    const user = await prisma.user.create({
      data: {
        name, email, password: hashPassword,
        profile: {
          connect: {
            id: profileId
          }
        }
      },
      select: {
        id: true, name: true, email: true, profile: true
      }
    });
    
    return user;

  }

  /**
   * find all
   */
  async findAll() {

  }

  /**
   * find by id
   */
  async findById(userId: number) {

  }

  /**
   * update
   */
  async update() {

  }

  /**
   * update password
   */
  async updatePassword() {

  }

}