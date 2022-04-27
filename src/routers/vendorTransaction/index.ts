import { Router } from "express";
import { getVendorBillPayment, getVendorBills } from "./controllers/get";
import { vendorBillPaymentPost, vendorBillPost } from "./controllers/post";

const vendorTransaction = Router();


// bills 
vendorTransaction.get('/getvendorbills', getVendorBills);
vendorTransaction.post('/createvendorbill', vendorBillPost);

// bill Payment 
vendorTransaction.get('/getvendorbillpayment', getVendorBillPayment);
vendorTransaction.post('/createvendorbillpayment', vendorBillPaymentPost);


export default vendorTransaction;