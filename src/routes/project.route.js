import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { projectController } from "../controllers/project.controller.js";

const projectRouter = Router();

projectRouter.post("/", authMiddleware.authenticate, projectController.create);

projectRouter.get("/", authMiddleware.authenticate, projectController.getAll);

projectRouter.get(
    "/:id",
    authMiddleware.authenticate,
    projectController.getOne
);

projectRouter.post(
    "/contributors/add",
    authMiddleware.authenticate,
    projectController.addContributor
);

projectRouter.patch(
    "/contributors/deactivate",
    authMiddleware.authenticate,
    projectController.deactivateContributor
);

projectRouter.patch(
    "/:id",
    authMiddleware.authenticate,
    projectController.update
);

projectRouter.patch(
    "/:id/change-status",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    projectController.changeStatus
);

export { projectRouter };
