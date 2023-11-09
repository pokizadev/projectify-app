import { Router } from "express";
import { userMiddleware } from "../middlewares/user.middleware.js";
import { teamMemberController } from "../controllers/team-member.controller.js";

const teamMemberRouter = new Router();

export { teamMemberRouter };