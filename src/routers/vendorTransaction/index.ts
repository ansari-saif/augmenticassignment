import { Router } from "express";
import { vendorBilldelete, vendorBillPaymentdelete, vendorPurchaseOrderdelete } from "./controllers/delete";
import { getVendorBillPayment, getVendorBills, getVendorCredit, getVendorExpense, getVendorPurchaseOrder } from "./controllers/get";
import { vendorBillPaymentPost, vendorBillPost, vendorCreditPost, vendorExpensePost, vendorPurchaseOrderPost } from "./controllers/post";
import { vendorBillPaymentPut, vendorBillPut, vendorPurchaseOrderPut } from "./controllers/put";

const vendorTransaction = Router();


// bills 
vendorTransaction.get('/getvendorbills', getVendorBills);
vendorTransaction.post('/createvendorbill', vendorBillPost);
vendorTransaction.put('/updatevendorbill/:id', vendorBillPut);
vendorTransaction.delete('/removevendorbill/:id', vendorBilldelete);

// bill Payment 
vendorTransaction.get('/getvendorbillpayment', getVendorBillPayment);
vendorTransaction.post('/createvendorbillpayment', vendorBillPaymentPost);
vendorTransaction.put('/updatevendorbillpayment/:id', vendorBillPaymentPut);
vendorTransaction.delete('/removevendorbillpayment/:id', vendorBillPaymentdelete);

// expense 
vendorTransaction.get('/getvendorexpense', getVendorExpense);
vendorTransaction.post('/createvendorexpense', vendorExpensePost);

// Purchase Order 
vendorTransaction.get('/getvendorpurchaseorder', getVendorPurchaseOrder);
vendorTransaction.post('/createpurchaseorder', vendorPurchaseOrderPost);
vendorTransaction.put('/updatepurchaseorder/:id', vendorPurchaseOrderPut);
vendorTransaction.delete('/removepurchaseorder/:id', vendorPurchaseOrderdelete);

// Vendor Credit
vendorTransaction.get('/getvendorcredit', getVendorCredit);
vendorTransaction.post('/createvendorcredit', vendorCreditPost);

export default vendorTransaction;