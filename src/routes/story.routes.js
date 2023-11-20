import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { storyController } from "../controllers/story.controller";
const storyRouter = Router();

storyRouter.post(
    "/",
    authMiddleware.authenticate,
    authMiddleware.isAdmin,
    storyController.create
);

export { storyRouter };
