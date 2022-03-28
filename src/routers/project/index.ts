import { Router } from "express";
import {
  controllerDelete,
  controllerGet,
  controllerPost,
  controllerPostAttachment,
  controllerPut,
  controllerPostLayout,
  controllerPostSubPlots,
  controllerPostLandDivisionCSV,
} from "./controllers";
import taskRouter from "./routers";

const projectRouter = Router();

projectRouter.use("/tasks", taskRouter);

projectRouter.get("/", controllerGet);
projectRouter.get("/:id", controllerGet);
projectRouter.post("/", controllerPost);
projectRouter.post("/:id/attachment", controllerPostAttachment);
projectRouter.post("/:id/layout", controllerPostLayout);
projectRouter.post("/:id/subPlots", controllerPostSubPlots);
projectRouter.post("/:id/landDivision/csv", controllerPostLandDivisionCSV);
projectRouter.put("/:id", controllerPut);
projectRouter.delete("/:id", controllerDelete);

export default projectRouter;
