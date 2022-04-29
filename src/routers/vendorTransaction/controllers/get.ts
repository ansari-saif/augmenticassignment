import { Request, Response } from "express";
import { VendorBill } from "../../../models/VendorBill";
import { VendorBillPayment } from "../../../models/vendorBillPayment";
import { VendorExpense } from "../../../models/vendorExpense";

export const getVendorBills = async (req: Request, res: Response) => {
  try {
    const vendorBills = await VendorBill.find(req.query).populate({path: "vendorId", select: "name"});

    res.status(200).json(vendorBills);
    
  } catch (err) {
    res.status(500).json({ msg: "Server error cannot fetch vendor's bills" });
  }
}

export const getVendorBillPayment = async (req: Request, res: Response) => {
  try {
    const vendorBillPayment = await VendorBillPayment.find(req.query).populate({path: "vendorId", select: "name"});

    res.status(200).json(vendorBillPayment);
    
  } catch (err) {
    res.status(500).json({ msg: "Server error cannot fetch vendor's bill payments" });
  }
}

export const getVendorExpense = async (req: Request, res: Response) => {
  try {
    const vendorExpense = await VendorExpense.find(req.query).populate({path: "vendorId", select: "name"}).populate({path: "customerId", select: "displayName"});

    res.status(200).json(vendorExpense);
    
  } catch (err) {
    res.status(500).json({ msg: "Server error cannot fetch vendor's Expenses" });
  }
}