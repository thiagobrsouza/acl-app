import { Request, Response, Router } from "express";
import { UserService } from "../services/UserService";
import { body, validationResult } from "express-validator";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { hasPermission } from "../middlewares/hasPermission";

export const userRoutes = Router();
const service = new UserService();

/**
 * create
 */
userRoutes.post('/users',
  isAuthenticated,
  hasPermission(['criar, editar usuário']),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().isEmail().withMessage('Email is required and must be unique'),
  body('password').notEmpty().withMessage('Password is required'),
  body('profileId').notEmpty().withMessage('Profile is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, confirmPassword, profileId } = req.body;
    const result = await service.create({ name, email, password, confirmPassword, profileId });
    return res.status(201).json(result);
  }
);

/**
 * find all
 */
userRoutes.get('/users',
  isAuthenticated,
  hasPermission(['buscar usuários']),
  async (req: Request, res: Response) => {
    const result = await service.findAll();
    return res.json(result);
  });

/**
 * find by id
 */
userRoutes.get('/users/:userId',
  isAuthenticated,
  hasPermission(['buscar usuários']),
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await service.findById(+userId);
    return res.json(result);
  });

/**
 * update
 */
userRoutes.patch('/users/:userId',
  isAuthenticated,
  hasPermission(['detalhes usuário']),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').notEmpty().isEmail().withMessage('Email is required and must be unique'),
  body('profileId').notEmpty().withMessage('Profile is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const { name, email, profileId } = req.body;
    const result = await service.update(+userId, { name, email, profileId });
    return res.json(result);
  });

/**
 * update password
 */
userRoutes.patch('/users/passwd/:userId',
  isAuthenticated,
  hasPermission(['criar, editar usuário']),
  body('password').notEmpty().withMessage('Password is required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId } = req.params;
    const { password, confirmPassword } = req.body;
    const result = await service.updatePassword(+userId, { password, confirmPassword });
    return res.json(result);
  }
);