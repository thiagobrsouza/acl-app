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

interface UserUpdate {
  name: string;
  email: string;
  profileId: number;
}

interface UserPasswordUpdate {
  password: string;
  confirmPassword: string;
}

interface UserUpdateMe {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
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
    return await prisma.user.findMany({
      select: {
        id: true, name: true, email: true, profile: true
      }
    });
  }

  /**
   * find by id
   */
  async findById(userId: number) {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true, name: true, email: true, profile: true
      }
    });
    return user;
  }

  /**
   * update
   */
  async update(userId: number, { name, email, profileId }: UserUpdate) {

    const userUpdated = await prisma.user.findFirst({
      where: { id: userId }
    });

    const exists = await prisma.user.findFirst({
      where: { email }
    });

    if (exists && exists.id !== userUpdated?.id) {
      throw new ConflictException('Email already registered');
    }

    return await prisma.user.update({
      where: { id: userId },
      data: {
        name, email, profile: {
          connect: { id: profileId }
        }
      },
      select: {
        id: true, name: true, email: true, profile: true
      }
    });

  }

  /**
   * update password
   */
  async updatePassword(userId: number, { password, confirmPassword }: UserPasswordUpdate) {
    
    const hashPassword = await hash(password, 8);

    if (password !== confirmPassword) {
      throw new Error('Passwords not matches!');
    } 
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashPassword
      },
      select: {
        id: true, name: true, email: true, profile: true
      }
    });

    return user;
  }

  /**
   * user details me
   */
  async userDetails(userId: number) {
    const user = await prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true, name: true, email: true
      }
    });
    return user;
  }

  /**
   * update self
   */
  async updateMe(userId: number, { name, email, password, confirmPassword }: UserUpdateMe) {
    const userUpdated = await prisma.user.findFirst({
      where: { id: userId }
    });

    const exists = await prisma.user.findFirst({
      where: { email }
    });

    if (exists && exists.id !== userUpdated?.id) {
      throw new ConflictException('Email already registered');
    }

    const hashPassword = await hash(password, 8);

    if (password !== confirmPassword) {
      throw new Error('Passwords not matches!');
    }

    return await prisma.user.update({
      where: { id: userId },
      data: {
        name, email, password: hashPassword
      },
      select: {
        id: true, name: true, email: true
      }
    });

  }

}