import { Router } from "express";
import { permissionRoutes } from "./controllers/PermissionController";
import { profileRoutes } from "./controllers/ProfileController";
import { userRoutes } from "./controllers/UserController";

export const routes = Router();

routes.use(permissionRoutes);
routes.use(profileRoutes);
routes.use(userRoutes);