import { Request, Response } from "express";
import { PurchaseOrder } from "../../../models/purchaseOrder";
import { VendorBill } from "../../../models/VendorBill";
import { VendorBillPayment } from "../../../models/vendorBillPayment";
import { VendorExpense } from "../../../models/vendorExpense";

export const vendorBillPost = async(req: Request, res: Response) => {
  try {
    const vendorBill = await VendorBill.create(req.body);

    res.status(200).json(vendorBill);
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Bill wasn't created" })
  }

}

export const vendorBillPaymentPost = async(req: Request, res: Response) => {
  try {
    const vendorBillPayment = await VendorBillPayment.create(req.body);

    res.status(200).json(vendorBillPayment);
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Bill Payment cannot be processed" })
  }

}

export const vendorExpensePost = async(req: Request, res: Response) => {
  try {
    const vendorExpense = await VendorExpense.create(req.body);

    res.status(200).json(vendorExpense);
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Expense Data wasn't able to stored" });
  }

}

export const vendorPurchaseOrderPost = async(req: Request, res: Response) => {
  try {
    const purchaseOrder = await PurchaseOrder.create(req.body);

    res.status(200).json(purchaseOrder);
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Purchase Order Data wasn't able to stored" });
  }

}