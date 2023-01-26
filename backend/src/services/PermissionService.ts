import { prisma } from "../prisma";

export class PermissionService {

  /**
   * list all
   */
  async findAll() {
    return await prisma.permission.findMany();
  }

  /**
   * find by id
   */
  async findById(permissionId: number) {
    const permission = await prisma.permission.findFirst({
      where: { id: permissionId }
    });
    return permission;
  }

}