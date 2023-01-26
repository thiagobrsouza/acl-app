import { Router } from "express";
import { permissionRoutes } from "./controllers/PermissionController";
import { profileRoutes } from "./controllers/ProfileController";

export const routes = Router();

routes.use(permissionRoutes);
routes.use(profileRoutes);