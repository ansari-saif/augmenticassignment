import { Router } from "express";
import {
  controllerPost,
  controllerGet,
  controllerDelete,
} from "./controllers";

const salesOrderRouter = Router();

salesOrderRouter.get("/", controllerGet);
salesOrderRouter.get("/:id", controllerGet);
salesOrderRouter.post("/", controllerPost);
// saleEstimateRouter.put("/:id", controllerPut);
salesOrderRouter.delete("/:id", controllerDelete);

export default salesOrderRouter;