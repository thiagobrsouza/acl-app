import { Router } from "express";
import { permissionRoutes } from "./controllers/PermissionController";

export const routes = Router();

routes.use(permissionRoutes);