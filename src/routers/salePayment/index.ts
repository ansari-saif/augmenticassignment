import { Router } from "express";
import {
  controllerDelete,
  controllerGet,
  controllerPost,
  controllerPut,
} from "./controllers";

const salePaymentRouter = Router();

salePaymentRouter.get("/", controllerGet);
salePaymentRouter.get("/:id", controllerGet);
salePaymentRouter.delete("/:id", controllerDelete);
salePaymentRouter.post("/", controllerPost);
salePaymentRouter.put("/:id", controllerPut);

export default salePaymentRouter;
