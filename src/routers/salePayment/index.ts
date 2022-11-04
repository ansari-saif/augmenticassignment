import { Router } from "express";
import {
  controllerDelete,
  controllerGet,
  controllerPost,
  controllerPut,
} from "./controllers";
import { updatePayCredits } from "./controllers/put";

const salePaymentRouter = Router();

salePaymentRouter.get("/", controllerGet);
salePaymentRouter.get("/:id", controllerGet);
salePaymentRouter.delete("/:id", controllerDelete);
salePaymentRouter.post("/", controllerPost);
// salePaymentRouter.put("/:id", controllerPut);

salePaymentRouter.put("/paycredit", updatePayCredits);

export default salePaymentRouter;
