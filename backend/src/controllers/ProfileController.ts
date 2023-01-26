import { Request, Response, Router } from "express";
import { ProfileService } from "../services/ProfileService";
import { body, validationResult } from "express-validator";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { hasPermission } from "../middlewares/hasPermission";

export const profileRoutes = Router();
const service = new ProfileService();

/**
 * create
 */
profileRoutes.post('/profiles',
  isAuthenticated,
  hasPermission(['criar, editar perfil']),
  body('name').notEmpty().withMessage('Name is required and must be unique'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, permissions } = req.body;
    const result = await service.create({ name, permissions });
    return res.status(201).json(result);
  });

/**
 * find all
 */
profileRoutes.get('/profiles',
  isAuthenticated,
  hasPermission(['buscar perfis']),
  async (req: Request, res: Response) => {
    const result = await service.findAll();
    return res.json(result);
  });

/**
 * find by id
 */
profileRoutes.get('/profiles/:profileId',
  isAuthenticated,
  hasPermission(['buscar perfis']),
  async (req: Request, res: Response) => {
    const { profileId } = req.params;
    const result = await service.findById(+profileId);
    return res.json(result);
  });

/**
 * update
 */
profileRoutes.patch('/profiles/:profileId',
  isAuthenticated,
  hasPermission(['criar, editar perfil']),
  body('name').notEmpty().withMessage('Name is required and must be unique'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { profileId } = req.params;
    const { name, addPermission, removePermission } = req.body;
    const result = await service.update(+profileId, { name, addPermission, removePermission });
    return res.status(201).json(result);
  }
);

/**
 * remove
 */
profileRoutes.delete('/profiles/:profileId',
  isAuthenticated,
  hasPermission(['excluir perfil']),
  async (req: Request, res: Response) => {
    const { profileId } = req.params;
    const result = await service.remove(+profileId);
    return res.json(result);
  });