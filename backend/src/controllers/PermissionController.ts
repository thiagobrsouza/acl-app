import { Request, Response, Router } from "express";
import { PermissionService } from "../services/PermissionService";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { hasPermission } from "../middlewares/hasPermission";

export const permissionRoutes = Router();
const service = new PermissionService();

/**
 * list all
 */
permissionRoutes.get('/permissions',
  isAuthenticated,
  hasPermission(['controle total permissoes']),
  async (req: Request, res: Response) => {
    const result = await service.findAll();
    return res.json(result);
  });

/**
 * find by id
 */
permissionRoutes.get('/permissions/:permissionId',
  isAuthenticated,
  hasPermission(['controle total permissoes']),
  async (req: Request, res: Response) => {
    const { permissionId } = req.params;
    const result = await service.findById(+permissionId);
    return res.json(result);
  });