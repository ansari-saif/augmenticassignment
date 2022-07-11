import { Types } from "mongoose";
import { Request, Response } from "express";
import { PurchaseOrder } from "../../../models/purchaseOrder";
import { RecurringBill } from "../../../models/recurringBill";
import { RecurringExpense } from "../../../models/recurringExpense";
import { VendorBill } from "../../../models/VendorBill";
import { VendorBillPayment } from "../../../models/vendorBillPayment";
import { VendorCredit } from "../../../models/vendorCredit";
import { VendorExpense } from "../../../models/vendorExpense";

export const getVendorBills = async (req: Request, res: Response) => {
  try {
    const vendorBills = await VendorBill.find(req.query).populate({path: "vendorId", select: "name billAddress"}).populate({ path: "projectId", select: "name" });

    res.status(200).json(vendorBills);
    
  } catch (err) {
    res.status(500).json({ msg: "Server error cannot fetch vendor's bills" });
  }
}

export const getVendorBillPayment = async (req: Request, res: Response) => {
  try {
    const vendorBillPayment = await VendorBillPayment.find(req.query).populate({path: "vendorId", select: "name billAddress"});

    res.status(200).json(vendorBillPayment);
    
  } catch (err) {
    res.status(500).json({ msg: "Server error cannot fetch vendor's bill payments" });
  }
}

export const getPatmentofBill = async (req: Request, res: Response) => { 
  try {
    
    const { vendorId, vendorBill }  = req.query;
    const vendorBillPayment = await VendorBillPayment.find({ vendorId }).populate({path: "vendorId", select: "name billAddress"});
    
    const vendorBillPaymentOfBill = vendorBillPayment.filter(vb => {
      const vendorBillIds = vb.vendorBill.map(vb => vb._id);
      const bool = vendorBillIds.filter(vbId => vbId.toString() === (vendorBill as any).toString()).length > 0;
      
      return bool;
    });
    res.status(200).json(vendorBillPaymentOfBill);
    
  } catch (err) {
    res.status(500).json({ msg: "Server error cannot fetch payments of bill" });
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

export const getVendorPurchaseOrder = async (req: Request, res: Response) => {
  try {
    const purchaseOrder = await PurchaseOrder.find(req.query).populate({path: "vendorId", select: "name billAddress"}).populate({path: "customerId", select: "displayName shippingAddress"}).populate({ path: "projectId", select: "name" });

    res.status(200).json(purchaseOrder);
    
  } catch (err) {
    res.status(500).json({ msg: "Server error cannot fetch vendor's Purchase Order" });
  }
}

export const getVendorCredit = async (req: Request, res: Response) => {
  try {
    const vendorCredit = await VendorCredit.find(req.query).populate({path: "vendorId", select: "name billAddress"});

    res.status(200).json(vendorCredit);
    
  } catch (err) {
    res.status(500).json({ msg: "Server error cannot fetch vendor's Credit" });
  }
}

export const getRecurringExpense = async (req: Request, res: Response) => {
  try {
    const recurringExpense = await RecurringExpense.find(req.query).populate({path: "vendorId", select: "name billAddress"}).populate({path: "customerId", select: "displayName"}).populate({ path: "projectId", select: "name" }).populate({ path: "projectId", select: "name" });

    res.status(200).json(recurringExpense);
    
  } catch (err) {
    res.status(500).json({ msg: "Server error cannot fetch vendor's Recurring Expenses" });
  }
}

export const getRecurringBill = async (req: Request, res: Response) => {
  try {
    const recurringBill = await RecurringBill.find(req.query).populate({path: "vendorId", select: "name billAddress"}).populate({ path: "projectId", select: "name" });

    res.status(200).json(recurringBill);
    
  } catch (err) {
    res.status(500).json({ msg: "Server error cannot fetch vendor's Recurring Bill" });
  }
}