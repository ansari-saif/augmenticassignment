import { Router } from "express";
import {
  controllerDelete,
  controllerGetInvoice,
  controllerGetRecurringInvoices,
  controllerPost,
  controllerPut,
} from "./controllers";

const saleInvoiceRouter = Router();

saleInvoiceRouter.get("/", controllerGetInvoice);
saleInvoiceRouter.get("/:id", controllerGetInvoice);
saleInvoiceRouter.get("/recurring/:id", controllerGetRecurringInvoices);
saleInvoiceRouter.get("/recurring", controllerGetRecurringInvoices);
saleInvoiceRouter.delete("/:id", controllerDelete);
saleInvoiceRouter.post("/", controllerPost as any);
saleInvoiceRouter.put("/:id", controllerPut);

export default saleInvoiceRouter;
