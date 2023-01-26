import { Request, Response, Router } from "express";
import { UserService } from "../services/UserService";
import { body, validationResult } from "express-validator";

export const userRoutes = Router();
const service = new UserService();

/**
 * create
 */
userRoutes.post('/users',
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
userRoutes.get('/users');

/**
 * find by id
 */
userRoutes.get('/users/:userId');

/**
 * update
 */
userRoutes.patch('/users/:userId');

/**
 * update password
 */
userRoutes.patch('/users/passwd/:userId');