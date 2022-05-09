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
    path: path.join(__dirname , `generated/${billData.billNo}.pdf`),
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

export default generatePDFRouter;
