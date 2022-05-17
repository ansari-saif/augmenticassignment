import { IVendorBill } from "../../db/schema/vendorBill";

const pdf = require("pdf-creator-node");
import fs from "fs";
import { Router } from "express";
import path from "path";

const generatePDFRouter = Router();

export const generateBillPDF = async (billData: any) => {
  const html = fs.readFileSync(path.join(__dirname , "Bill_Template.html"), "utf8");
  // console.log(billData)
  const document = {
    html: html,
    data: {
      billData : billData,
    },
    path: path.join(__dirname , `generated/${billData._id}.pdf`),
    type: "",
  };

  const options = {
    format: "A4",
    orientation: "portrait",
    border: "5mm",
  };

  const res = await pdf.create(document, options);
  console.log("FILE CREATED")
  return document.path;
};

export const generatePurchaseOrderPDF = async (purchaseOrderData: any) => {
  const html = fs.readFileSync(path.join(__dirname , "Purchase_Order_Template.html"), "utf8");
  // console.log(purchaseOrderData)
  const document = {
    html: html,
    data: {
      purchaseOrderData : purchaseOrderData,
    },
    path: path.join(__dirname , `generated/${purchaseOrderData._id}.pdf`),
    type: "",
  };

  const options = {
    format: "A4",
    orientation: "portrait",
    border: "5mm",
  };

  const res = await pdf.create(document, options);
  console.log("FILE CREATED")
  return document.path;
};

export const generateVendorCreditPDF = async (creditData: any) => {
  try {
    const html = fs.readFileSync(path.join(__dirname , "Vendor_Credit_Template.html"), "utf8");
    // console.log(creditData)
    const document = {
      html: html,
      data: {
        creditData : creditData,
      },
      path: path.join(__dirname , `generated/${creditData._id}.pdf`),
      type: "",
    };
  
    const options = {
      format: "A4",
      orientation: "portrait",
      border: "5mm",
    };
  
    const res = await pdf.create(document, options);
    console.log("FILE CREATED");
    return document.path;
    
  } catch (err) {
    console.error(err);
  
  }
};


export default generatePDFRouter;
