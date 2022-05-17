import { Router } from "express";
import { deleteVendorFile, vendorBilldelete, vendorBillPaymentdelete, vendorCreditdelete, vendorExpensedelete, vendorPurchaseOrderdelete } from "./controllers/delete";
import { getVendorBillPayment, getVendorBills, getVendorCredit, getVendorExpense, getVendorPurchaseOrder } from "./controllers/get";
import { uploadVendorFile, vendorBillPaymentPost, vendorBillPost, vendorCreditPost, vendorExpensePost, vendorPurchaseOrderPost } from "./controllers/post";
import { vendorBillPaymentPut, vendorBillPut, vendorCreditPut, vendorExpensePut, vendorPurchaseOrderPut } from "./controllers/put";

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
vendorTransaction.put('/updatevendorexpense/:id', vendorExpensePut);
vendorTransaction.delete('/removevendorexpense/:id', vendorExpensedelete);

// Purchase Order 
vendorTransaction.get('/getvendorpurchaseorder', getVendorPurchaseOrder);
vendorTransaction.post('/createpurchaseorder', vendorPurchaseOrderPost);
vendorTransaction.put('/updatepurchaseorder/:id', vendorPurchaseOrderPut);
vendorTransaction.delete('/removepurchaseorder/:id', vendorPurchaseOrderdelete);

// Vendor Credit
vendorTransaction.get('/getvendorcredit', getVendorCredit);
vendorTransaction.post('/createvendorcredit', vendorCreditPost);
vendorTransaction.put('/updatevendorcredit/:id', vendorCreditPut);
vendorTransaction.delete('/removevendorcredit/:id', vendorCreditdelete);

// Upload File 
vendorTransaction.post('/upload', uploadVendorFile);
vendorTransaction.delete('/removefile/:fileName', deleteVendorFile);

export default vendorTransaction;