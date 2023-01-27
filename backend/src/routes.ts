import { Router } from "express";
import { permissionRoutes } from "./controllers/PermissionController";
import { profileRoutes } from "./controllers/ProfileController";
import { userRoutes } from "./controllers/UserController";
import { authRoute } from "./controllers/AuthenticationController";
import { carRoutes } from "./controllers/CarController";

export const routes = Router();

routes.use(permissionRoutes);
routes.use(profileRoutes);
routes.use(userRoutes);
routes.use(authRoute);
routes.use(carRoutes);