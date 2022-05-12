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


export const vendorBillPut = async(req: Request, res: Response) => {
  try {
    const vendorBill : any = await VendorBill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    // UPLOAD FILE TO CLOUD 
    const uploadedVendorBill = await VendorBill.findOne({_id : vendorBill._id}).populate({path: "vendorId", select: "name billAddress"});

    await deleteFile(`${uploadedVendorBill._id}.pdf`);
  
    const pathToFile = await generateBillPDF(uploadedVendorBill.toJSON());
    const file = await fs.readFileSync(pathToFile);
    // console.log(pathToFile);
    await putFile(file, `${uploadedVendorBill._id}.pdf` );

    await VendorBill.updateOne({_id : vendorBill._id} , {pdf_url : `https://knmulti.fra1.digitaloceanspaces.com/${uploadedVendorBill._id}.pdf`})

    await fs.rmSync(pathToFile);

    // await updateFile(VendorBill, vendorBill, {path: "vendorId", select: "name billAddress"});

    res.status(200).json({...vendorBill._doc , pdf_url : `https://knmulti.fra1.digitaloceanspaces.com/${uploadedVendorBill._id}.pdf` });
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Bill wasn't created" })
  }

}

export const vendorBillPaymentPut = async(req: Request, res: Response) => {
  try {
    const vendorBillPayment = await VendorBillPayment.findByIdAndUpdate(req.params.id, req.body, { new : true });

    res.status(200).json(vendorBillPayment);
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Bill Payment cannot be Updated" })
  }

}

export const vendorPurchaseOrderPut = async(req: Request, res: Response) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new : true });

    res.status(200).json(purchaseOrder);
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Purchase Order Data wasn't able to update" });
  }

}