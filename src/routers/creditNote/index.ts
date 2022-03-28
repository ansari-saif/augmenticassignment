import { Router } from "express";
import {
  controllerDelete,
  controllerGet,
  controllerPost,
  controllerPut,
} from "./controllers";

const creditNotesRouter = Router();

creditNotesRouter.get("/", controllerGet);
creditNotesRouter.get("/:id", controllerGet);
creditNotesRouter.post("/", controllerPost);
creditNotesRouter.put("/:id", controllerPut);
creditNotesRouter.delete("/:id", controllerDelete);

export default creditNotesRouter;
