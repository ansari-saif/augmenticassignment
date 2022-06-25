import { Router } from "express";
import {
  controllerGet,
  controllerGetStatusLeads,
  controllerGetStatusList,
  controllerPost,
} from "./controllers";

const leadStatusRouter = Router();

leadStatusRouter.post("/", controllerPost);
leadStatusRouter.get("/", controllerGet);
leadStatusRouter.get("/json", controllerGetStatusList);
leadStatusRouter.get("/check/:id", controllerGetStatusLeads);
leadStatusRouter.get("/:id", controllerGet);

export default leadStatusRouter;
