import { Router } from "express";
import {
  controllerGet,
  controllerGetStatusList,
  controllerPost,
} from "./controllers";

const leadStatusRouter = Router();

leadStatusRouter.post("/", controllerPost);
leadStatusRouter.get("/", controllerGet);
leadStatusRouter.get("/json", controllerGetStatusList);

export default leadStatusRouter;
