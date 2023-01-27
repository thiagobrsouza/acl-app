import { Request, Response, Router } from "express";
import { CarService } from "../services/CarService";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { hasPermission } from "../middlewares/hasPermission";

export const carRoutes = Router();
const service = new CarService();

/**
 * list all
 */
carRoutes.get('/cars',
  isAuthenticated,
  hasPermission(['controle total permissoes']),
  async (req: Request, res: Response) => {
    const result = await service.findAll();
    return res.json(result);
  });

/**
 * find by id
 */
carRoutes.get('/cars/:carId',
  isAuthenticated,
  hasPermission(['controle total permissoes']),
  async (req: Request, res: Response) => {
    const { carId } = req.params;
    const result = await service.findById(+carId);
    return res.json(result);
  });