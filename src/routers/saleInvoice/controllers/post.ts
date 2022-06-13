// create an express post route for the saleInvoice controller

import { Request, Response } from "express";
import { Customer, SaleInvoice } from "../../../models";
import RequestWithUser from "../../../utils/requestWithUser";
import putFile from "../../../utils/s3";
import validateSaleInvoice from "../../../validators/validateSaleInvoice";
import fs from 'fs';
import { generateSaleInvoicePDF } from "../../../utils/pdf-generation/generatePDF";

export default async function controllerPost(
  req: RequestWithUser,
  res: Response
) {
  const data = req.body;
  const errors = validateSaleInvoice(data);
  if (errors.length) {
    console.log(errors)
    res.status(400).json({ errors });
    return;
  }
  try {
    const saleInvoice: any = await SaleInvoice.create({ ...data, createdBy: req.user.id });
    const uploadedInvoice = await SaleInvoice.findById(saleInvoice._id).populate(["customer", "tax"]);
    const pathToFile = await generateSaleInvoicePDF(uploadedInvoice.toJSON())
    // const file = await fs.readFileSync(pathToFile);
    // await putFile(file, `${uploadedInvoice._id}.pdf`);
    // await SaleInvoice.updateOne({ _id : uploadedInvoice._id }, { pdf_url: `https://knmulti.fra1.digitaloceanspaces.com/${uploadedInvoice._id}.pdf` });
    // await fs.rmSync(pathToFile);
    // res.status(200).json({ pdf_url: `https://knmulti.fra1.digitaloceanspaces.com/${uploadedInvoice._id}.pdf`});
  } catch (e) {
    res.status(500).json({ msg: "Server Error: Sale Estimate data couldn't be created" });
  }

}
