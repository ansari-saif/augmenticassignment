import { Router } from "express";
import {
  controllerPost,
  controllerGet,
  controllerDelete,
} from "./controllers";

const deliveryChallanRouter = Router();

deliveryChallanRouter.get("/", controllerGet);
deliveryChallanRouter.get("/:id", controllerGet);
deliveryChallanRouter.post("/", controllerPost);
// saleEstimateRouter.put("/:id", controllerPut);
deliveryChallanRouter.delete("/:id", controllerDelete);

export default deliveryChallanRouter;