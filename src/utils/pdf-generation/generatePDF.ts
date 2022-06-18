import { IVendorBill } from "../../db/schema/vendorBill";

const pdf = require("pdf-creator-node");
import fs from "fs";
import { Router } from "express";
import path from "path";
import { DeliveryChallan } from "../../models";

const generatePDFRouter = Router();

export const generateBillPDF = async (billData: any) => {

  try {
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
  } catch (error) {
    console.log(error);
  }
  
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
  } catch (error) {
    console.log(error)
  }
    
};

export const generatePurchaseMadePDF = async (payInfo: any) => {
  const html = fs.readFileSync(path.join(__dirname , "Purchase_Made_Template.html"), "utf8");
  // console.log(payInfo)
  const document = {
    html: html,
    data: {
      payInfo : payInfo,
    },
    path: path.join(__dirname , `generated/${payInfo._id}.pdf`),
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

export const generateSaleEstimatePDF = async (estimate: any) => {
  const html = fs.readFileSync(path.join(__dirname , "Sale_Estimate_Template.html"), "utf8");
  const document = {
    html: html,
    data: {
      saleEstimateData : estimate,
    },
    path: path.join(__dirname , `generated/${estimate._id}.pdf`),
    type: "",
  };
  console.log('getting')
  try {

  } catch (e) {}
  const options = {
    format: "A4",
    orientation: "portrait",
    border: "5mm",
  };
  const res = await pdf.create(document, options);
  console.log("FILE CREATED")
  return document.path;
};

export const generateSalesOrderPDF = async (order: any) => {
  console.log('function called')
  const html = fs.readFileSync(path.join(__dirname , "Sale_Order_Template.html"), "utf8");
  console.log('tamplate acquired')
  const document = {
    html: html,
    data: {
      saleOrderData : order,
    },
    path: path.join(__dirname , `generated/${order._id}.pdf`),
    type: "",
  };
  
  const options = {
    format: "A4",
    orientation: "portrait",
    border: "5mm",
  };
  console.log('executing function')
  const res = await pdf.create(document, options);
  console.log("FILE CREATED")
  return document.path;
};

export const generateDeliveryChallanPDF = async (challan: any) => {
  const html = fs.readFileSync(path.join(__dirname , "Delivery_Challan_Template.html"), "utf8");
  const document = {
    html: html,
    data: {
      deliveryChallan : challan,
    },
    path: path.join(__dirname , `generated/${challan._id}.pdf`),
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

export const generateCreditNotePDF = async (note: any) => {
  const html = fs.readFileSync(path.join(__dirname , "Credit_Note_Template.html"), "utf8");
  const document = {
    html: html,
    data: {
      creditNoteData : note,
    },
    path: path.join(__dirname , `generated/${note._id}.pdf`),
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

export const generateSaleInvoicePDF = async (invoice: any) => {
  console.log('function started to execute')
  const html = fs.readFileSync(path.join(__dirname , "Sale_Invoice_Template.html"), "utf8");
  console.log('html acquired')
  const document = {
    html: html,
    data: {
      saleInvoiceData : invoice,
    },
    path: path.join(__dirname , `generated/${invoice._id}.pdf`),
    type: "",
  };
  console.log('objects made')
  
  const options = {
    format: "A4",
    orientation: "portrait",
    border: "5mm",
  };
  console.log('creating');
  const res = await pdf.create(document, options);
  console.log("FILE CREATED")
  return document.path;
};


export default generatePDFRouter;
