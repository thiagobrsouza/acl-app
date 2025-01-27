import { Request, Response, Router } from "express";
import { ProfileService } from "../services/ProfileService";

export const profileRoute = Router();
const service = new ProfileService();

profileRoute.get('/profiles', async (req: Request, res: Response) => {
  const response = await service.findAll();
  res.json(response);
  return;
});

profileRoute.get('/profiles/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await service.findById(id);
  res.json(response);
  return;
});