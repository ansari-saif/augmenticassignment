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
    const vendorBill : any = await VendorBill.findById(req.params.id);

    if(!vendorBill){
      return res.status(404).json({ msg: "vendor bill not found" });
    }

    // DELETE FILE TO CLOUD 
    if(vendorBill?.fileInfos){
      await vendorBill?.fileInfos.forEach((f : any) => {
        if(f?.fileName){
          deleteFile(`${f?.fileName}`);
        }
      });
    }

    await VendorBill.findByIdAndDelete(req.params.id);
    // DELETE PDF TO CLOUD 
    await deleteFile(`${req.params.id}.pdf`);

    res.status(200).json({ msg: `${req.params.id} vendor bill has been deleted` });
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Bill wasn't deleted" })
  }

}

export const vendorBillPaymentdelete = async(req: Request, res: Response) => {
  try {
    await VendorBillPayment.findByIdAndDelete(req.params.id);
    // DELETE FILE TO CLOUD 
    // await deleteFile(`${req.params.id}.pdf`);

    res.status(200).json({ msg: `${req.params.id} vendor bill payment has been deleted` });
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Bill payment wasn't deleted" })
  }

}

export const vendorPurchaseOrderdelete = async(req: Request, res: Response) => {
  try {

    const purchaseOrder : any = await PurchaseOrder.findById(req.params.id);

    if(!purchaseOrder){
      return res.status(404).json({ msg: "vendor purchase order not found" });
    }

    // DELETE FILE TO CLOUD 
    if(purchaseOrder?.fileInfos){
      await purchaseOrder?.fileInfos.forEach((f : any) => {
        if(f?.fileName){
          deleteFile(`${f?.fileName}`);
        }
      });
    }

    await PurchaseOrder.findByIdAndDelete(req.params.id);

    // DELETE PDF TO CLOUD 
    await deleteFile(`${req.params.id}.pdf`);

    res.status(200).json({ msg: `${req.params.id} vendor purchase order has been deleted` });
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: purchase order wasn't deleted" })
  }

}

export const vendorExpensedelete = async(req: Request, res: Response) => {
  try {

    const vendorExpense : any = await VendorExpense.findById(req.params.id);

    if(!vendorExpense){
      return res.status(404).json({ msg: "vendor expense not found" });
    }

    // DELETE FILE TO CLOUD 
    if(vendorExpense?.fileInfos){
      await vendorExpense?.fileInfos.forEach((f : any) => {
        if(f?.fileName){
          deleteFile(`${f?.fileName}`);
        }
      });
    }

    await VendorExpense.findByIdAndDelete(req.params.id);

    // DELETE FILE TO CLOUD 
    // await deleteFile(`${req.params.id}.pdf`);

    res.status(200).json({ msg: `${req.params.id} vendor expense has been deleted` });
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: purchase order wasn't deleted" })
  }

}

export const deleteVendorFile = async(req: Request, res: Response) => {
  try {

    await deleteFile(req.params.fileName);

    res.status(200).json({
      fileName: req.params.fileName,
      msg: `Deleted : ${req.params.fileName}` });
    
  } catch (err) {
    res.status(500).json({ msg: "file was NOT deleted" })
  }
}