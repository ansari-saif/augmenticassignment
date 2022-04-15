import { Router } from "express";
import userTypeGet from "./controllers/get";

const userTypeRouter = Router();

userTypeRouter.get("/", userTypeGet);

export default userTypeRouter;