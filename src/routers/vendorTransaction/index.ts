import { Router } from "express";
import { getVendorBillPayment, getVendorBills, getVendorExpense } from "./controllers/get";
import { vendorBillPaymentPost, vendorBillPost, vendorExpensePost } from "./controllers/post";

const vendorTransaction = Router();


// bills 
vendorTransaction.get('/getvendorbills', getVendorBills);
vendorTransaction.post('/createvendorbill', vendorBillPost);

// bill Payment 
vendorTransaction.get('/getvendorbillpayment', getVendorBillPayment);
vendorTransaction.post('/createvendorbillpayment', vendorBillPaymentPost);

// expense 
vendorTransaction.get('/getvendorexpense', getVendorExpense);
vendorTransaction.post('/createvendorexpense', vendorExpensePost);


export default vendorTransaction;