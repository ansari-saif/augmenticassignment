import { Router } from "express";
import { getVendorBillPayment, getVendorBills, getVendorCredit, getVendorExpense, getVendorPurchaseOrder } from "./controllers/get";
import { vendorBillPaymentPost, vendorBillPost, vendorCreditPost, vendorExpensePost, vendorPurchaseOrderPost } from "./controllers/post";

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

// Purchase Order 
vendorTransaction.get('/getvendorpurchaseorder', getVendorPurchaseOrder);
vendorTransaction.post('/createpurchaseorder', vendorPurchaseOrderPost);

// Vendor Credit
vendorTransaction.get('/getvendorcredit', getVendorCredit);
vendorTransaction.post('/createvendorcredit', vendorCreditPost);

export default vendorTransaction;