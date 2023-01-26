import { ConflictException } from "../middlewares/handleError";
import { prisma } from "../prisma";

interface ProfileRequest {
  name: string;
  permissions: number[];
}

interface ProfileUpdate {
  name: string;
  addPermission?: number[];
  removePermission?: number[];
}

export class ProfileService {

  /**
   * create
   */
  async create({ name, permissions }: ProfileRequest) {

    const exists = await prisma.profile.findFirst({
      where: { name }
    });

    if (exists) {
      throw new ConflictException('Profile already exists');
    }

    const profile = await prisma.profile.create({
      data: {
        name,
        profilePermissions: {
          create: permissions.map((permissionId: number) => ({
            permissions: {
              connect: { id: permissionId }
            }
          }))
        }
      },
      select: {
        id: true, name: true, profilePermissions: { select: { permissions: true } }
      }
    });

    return profile;
  }

  /**
   * find all
   */
  async findAll() {
    return await prisma.profile.findMany({
      select: {
        id: true, name: true, profilePermissions: { select: { permissions: true } }
      }
    });
  }

  /**
   * find by id
   */
  async findById(profileId: number) {
    const profile = await prisma.profile.findFirst({
      where: { id: profileId },
      select: {
        id: true, name: true, profilePermissions: { select: { permissions: true } }
      }
    });
    return profile;
  }

  /**
   * update
   */
  async update(profileId: number, { name, addPermission, removePermission }: ProfileUpdate) {

    const profileFounded = await prisma.profile.findFirst({
      where: { id: profileId }
    });

    const exists = await prisma.profile.findFirst({
      where: { name }
    });

    if (exists && exists.id !== profileFounded?.id) {
      throw new ConflictException('Profile already exists');
    }

    return await prisma.profile.update({
      where: { id: profileId },
      data: {
        name,
        profilePermissions: {
          create: addPermission?.map((permissionId: number) => ({
            permissions: {
              connect: { id: permissionId }
            }
          })),
          deleteMany: removePermission?.map((permissionId: number) => ({
            permissionId: permissionId,
            profileId: profileId
          }))
        }
      },
      select: {
        id: true, name: true, profilePermissions: { select: { permissions: true } }
      }
    });

  }

  /**
   * remove
   */
  async remove(profileId: number) {
    try {
      await prisma.profile.delete({
        where: { id: profileId }
      });
    } catch {
      throw new Error('Profile does not be removed');
    }
  }

}