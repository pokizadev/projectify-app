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

projectRouter.post(
    "/:id/contributors/add",
    authMiddleware.authenticate,
    projectController.addContributor
);

projectRouter.patch(
    "/:id/contributors/:teamMemberId/change-status",
    authMiddleware.authenticate,
    projectController.changeContributorStatus
);

projectRouter.get(
    "/:id/contributors",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    projectController.getContributors
);


export { projectRouter };
