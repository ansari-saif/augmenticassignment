import { Router } from "express";
import { 
  creditNote,
  deliveryChallan, 
  saleEstimate, 
  saleInvoice, 
  saleOrder, 
  salePayment, 
} from "./controllers/post";

const mailRouter = Router();

mailRouter.post('/estimate', saleEstimate);
mailRouter.post('/sale-order', saleOrder);
mailRouter.post('/delivery-challan', deliveryChallan);
mailRouter.post('/sale-invoice', saleInvoice);
mailRouter.post('/sale-payment', salePayment);
mailRouter.post('/credit-note', creditNote);

export default mailRouter;