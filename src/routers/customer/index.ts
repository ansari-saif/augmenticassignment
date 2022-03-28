import { Router } from "express";
import {
  controllerDelete,
  controllerGet,
  controllerPost,
  controllerPut,
} from "./controllers";

const customerRouter = Router();

customerRouter.get("/", controllerGet);
customerRouter.get("/:id", controllerGet);
customerRouter.post("/", controllerPost);
customerRouter.put("/:id", controllerPut);
customerRouter.delete("/:id", controllerDelete);

export default customerRouter;
