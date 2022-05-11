import { Request, Response } from "express";
import path from "path";
import { PurchaseOrder } from "../../../models/purchaseOrder";
import { VendorBill } from "../../../models/VendorBill";
import { VendorBillPayment } from "../../../models/vendorBillPayment";
import { VendorCredit } from "../../../models/vendorCredit";
import { VendorExpense } from "../../../models/vendorExpense";
import { generateBillPDF } from "../../../utils/pdf-generation/generatePDF";
// import uploadFileToCloud from "../../../utils/uploadToCloud"
import putFile, { deleteFile, updateFile } from "../../../utils/s3"
import fs from 'fs';


export const vendorBilldelete = async(req: Request, res: Response) => {
  try {
    await VendorBill.findByIdAndDelete(req.params.id);
    // DELETE FILE TO CLOUD 
    await deleteFile(`${req.params.id}.pdf`);

    res.status(200).json({ msg: `${req.params.id} vendor bill has been deleted` });
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Bill wasn't created" })
  }

}