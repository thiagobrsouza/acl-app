import { NextFunction, Request, Response, response } from "express";
import { prisma } from "../prisma";

export function hasPermission(permissionsRoutes: string[]) {

  return async (req: Request, res: Response, next: NextFunction) => {

    const { userId } = req;

    const user = await prisma.user.findFirst({
      where: { id: +userId },
      select: {
        profile: {
          select: { profilePermissions: {
            select: { 
              permissions: {
                select: { name: true }
              }
            }
          } }
        }
      }
    });

    const permissionExists = user.profile.profilePermissions.some((permission) => 
    permissionsRoutes.includes(permission.permissions.name));

    if (!permissionExists) {
      return res.status(401).end();
    }

    return next();

  }

}