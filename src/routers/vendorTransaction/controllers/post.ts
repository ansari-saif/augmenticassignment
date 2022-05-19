import { Request, Response } from "express";
import path from "path";
import { PurchaseOrder } from "../../../models/purchaseOrder";
import { VendorBill } from "../../../models/VendorBill";
import { VendorBillPayment } from "../../../models/vendorBillPayment";
import { VendorCredit } from "../../../models/vendorCredit";
import { VendorExpense } from "../../../models/vendorExpense";
import { generateBillPDF, generatePurchaseMadePDF, generatePurchaseOrderPDF, generateVendorCreditPDF} from "../../../utils/pdf-generation/generatePDF";
// import uploadFileToCloud from "../../../utils/uploadToCloud"
import putFile from "../../../utils/s3"
import fs from 'fs';
import fileUpload from "express-fileupload";

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


export const vendorBillPaymentPost = async(req: Request, res: Response) => {
  try {
    const vendorBillPayment : any = await VendorBillPayment.create(req.body);

    // UPLOAD FILE TO CLOUD 
    const uploadedVendorBillPayment = await VendorBillPayment.findOne({_id : vendorBillPayment._id}).populate({path: "vendorId", select: "name billAddress"});
  
    const pathToFile = await generatePurchaseMadePDF(uploadedVendorBillPayment.toJSON());
    const file = await fs.readFileSync(pathToFile);
    // console.log(pathToFile);
    await putFile(file, `${uploadedVendorBillPayment._id}.pdf` );

    await VendorBillPayment.updateOne({_id : vendorBillPayment._id} , {pdf_url : `https://knmulti.fra1.digitaloceanspaces.com/${uploadedVendorBillPayment._id}.pdf`})

    await fs.rmSync(pathToFile);

    res.status(200).json({...vendorBillPayment._doc , pdf_url : `https://knmulti.fra1.digitaloceanspaces.com/${uploadedVendorBillPayment._id}.pdf` });
    
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
    const purchaseOrder : any = await PurchaseOrder.create(req.body);
    // UPLOAD FILE TO CLOUD 
    const uploadedpurchaseOrder = await PurchaseOrder.findOne({_id : purchaseOrder._id}).populate({path: "vendorId", select: "name billAddress"}).populate({path: "customerId", select: "displayName shippingAddress"});
  
    const pathToFile = await generatePurchaseOrderPDF(uploadedpurchaseOrder.toJSON());
    const file = await fs.readFileSync(pathToFile);
    // console.log(pathToFile);
    await putFile(file, `${uploadedpurchaseOrder._id}.pdf` );

    await PurchaseOrder.updateOne({_id : purchaseOrder._id} , {pdf_url : `https://knmulti.fra1.digitaloceanspaces.com/${uploadedpurchaseOrder._id}.pdf`})

    await fs.rmSync(pathToFile);

    res.status(200).json({...purchaseOrder._doc , pdf_url : `https://knmulti.fra1.digitaloceanspaces.com/${uploadedpurchaseOrder._id}.pdf` });

    // res.status(200).json(purchaseOrder);
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Purchase Order Data wasn't able to stored" });
  }

}

export const vendorCreditPost = async(req: Request, res: Response) => {
  try {
    const vendorCredit : any = await VendorCredit.create(req.body);

    // res.status(200).json(vendorCredit);

    // UPLOAD FILE TO CLOUD 
    const uploadedVendorCredit = await VendorCredit.findOne({_id : vendorCredit._id}).populate({path: "vendorId", select: "name billAddress"});
  
    const pathToFile : any = await generateVendorCreditPDF(uploadedVendorCredit.toJSON());
    const file = await fs.readFileSync(pathToFile);
    // console.log(pathToFile);
    await putFile(file, `${uploadedVendorCredit._id}.pdf` );

    await VendorCredit.updateOne({_id : vendorCredit._id} , {pdf_url : `https://knmulti.fra1.digitaloceanspaces.com/${uploadedVendorCredit._id}.pdf`});

    await fs.rmSync(pathToFile);

    res.status(200).json({...vendorCredit._doc , pdf_url : `https://knmulti.fra1.digitaloceanspaces.com/${uploadedVendorCredit._id}.pdf` });
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: Vendor Credit Data wasn't able to stored" });
  }

}

export const uploadVendorFile = async(req: Request, res: Response) => {
  try { 

    if(req.files === null){
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files?.file as fileUpload.UploadedFile;

    const fileName = `purchasefile_${Date.now()}_${file?.name}`;

    file?.mv(`${__dirname}/${fileName}`, err => {
      console.error(err);
      return
    });
    
    
    await putFile(`${__dirname}/${fileName}`, `${fileName}`, file );

    fs?.unlink(`${__dirname}/${fileName}`, (err => {
      if(err) { console.log(err)
        return
      }
      else {
        console.log("Folder file Deleted");
      }
    }));

    res.status(200).json({ fileName: fileName, filePath: `https://knmulti.fra1.digitaloceanspaces.com/${fileName}` });
    
  } catch (err) {
    res.status(500).json({ msg: "Server Error: File was not uploaded" });
  }

}