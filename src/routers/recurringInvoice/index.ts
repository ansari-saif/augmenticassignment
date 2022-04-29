import { Router } from "express";
import {
  controllerPost,
  controllerGet,
  controllerDelete,
} from "./controllers";

const recurringInvoice = Router();

recurringInvoice.get("/", controllerGet);
recurringInvoice.get("/:id", controllerGet);
recurringInvoice.post("/", controllerPost);
// saleEstimateRouter.put("/:id", controllerPut);
recurringInvoice.delete("/:id", controllerDelete);

export default recurringInvoice;