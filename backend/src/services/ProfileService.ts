import { prisma } from "../prisma";

export class ProfileService {

  async findAll() {
    return await prisma.profile.findMany();
  }

  async findById(id: string) {
    const profile = await prisma.profile.findUnique({
      where: { id }
    });
    return profile;
  }
  
}