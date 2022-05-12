import { Request, Response } from "express";
import path from "path";
import { PurchaseOrder } from "../../../models/purchaseOrder";
import { VendorBill } from "../../../models/VendorBill";
import { VendorBillPayment } from "../../../models/vendorBillPayment";
import { VendorCredit } from "../../../models/vendorCredit";
import { VendorExpense } from "../../../models/vendorExpense";
import { generateBillPDF } from "../../../utils/pdf-generation/generatePDF";
// import uploadFileToCloud from "../../../utils/uploadToCloud"
import putFile from "../../../utils/s3"
import fs from 'fs';

export const vendorBillPost = async(req: Request, res: Response) => {
  try {
    const vendorBill : any = await VendorBill.create(req.body);
    // UPLOAD FILE TO CLOUD 
    const uploadedVendorBill = await VendorBill.findOne({_id : vendorBill._id}).populate({path: "vendorId", select: "name billAddress"});
  
    const pathToFile = await generateBillPDF(uploadedVendorBill.toJSON());
    const file = await fs.readFileSync(pathToFile);
    // console.log(pathToFile);
    await putFile(file, `${uploadedVendorBill._id}.pdf` );

    await VendorBill.updateOne({_id : vendorBill._id} , {pdf_url : `https://knmulti.fra1.digitaloceanspaces.com/${uploadedVendorBill._id}.pdf`})

    await fs.rmSync(pathToFile);

    res.status(200).json({...vendorBill._doc , pdf_url : `https://knmulti.fra1.digitaloceanspaces.com/${uploadedVendorBill._id}.pdf` });
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Bill wasn't created" })
  }

}

// export const uploadVendorBillFill = async(req: Request, res: Response) => {
//   try {
    
//     await putFile(file, `` );

    
//   } catch (err) {
//     res.status(500).json({ msg: "Server Error: Bill wasn't created" })
//   }

// }

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

export const vendorCreditPost = async(req: Request, res: Response) => {
  try {
    const vendorCredit = await VendorCredit.create(req.body);

    res.status(200).json(vendorCredit);
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Vendor Credit Data wasn't able to stored" });
  }

}