import { Router } from "express";
import {
  controllerDelete,
  controllerGet,
  controllerPost,
  controllerPut,
} from "./controllers";

const candidateRouter = Router();

candidateRouter.get("/", controllerGet);
candidateRouter.get("/:id", controllerGet);
candidateRouter.post("/", controllerPost);
candidateRouter.put("/:id", controllerPut);
candidateRouter.delete("/:id", controllerDelete);

export default candidateRouter;
