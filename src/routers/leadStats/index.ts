import { Router } from "express";
import {
  controllerGet,
  controllerPost,
} from "./controllers";

const leadStatusRouter = Router();

leadStatusRouter.post("/", controllerPost);
leadStatusRouter.get("/", controllerGet);

export default leadStatusRouter;
