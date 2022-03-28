import { Router } from "express";
import {
  controllerDelete,
  controllerGet,
  controllerPost,
  controllerPut,
  controllerGetByJobId,
  controllerGetByStatus,
} from "./controllers";

const candidateRouter = Router();

candidateRouter.get("/", controllerGet);
candidateRouter.get("/:id", controllerGet);
candidateRouter.get("/jobId/:id", controllerGetByJobId);
candidateRouter.get("/status/:status", controllerGetByStatus);
candidateRouter.post("/", controllerPost);
candidateRouter.put("/:id", controllerPut);
candidateRouter.delete("/:id", controllerDelete);

export default candidateRouter;
