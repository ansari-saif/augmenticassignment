import { Router } from "express";
import {
  controllerDelete,
  controllerGet,
  controllerPost,
  controllerPut,
} from "./controllers";

const leadRouter = Router();

leadRouter.get("/", controllerGet);
leadRouter.get("/:id", controllerGet);
leadRouter.post("/", controllerPost as any);
leadRouter.put("/:id", controllerPut as any);
leadRouter.delete("/:id", controllerDelete);

export default leadRouter;
