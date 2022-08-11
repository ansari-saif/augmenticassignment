// create an express post route for the saleInvoice controller

import { Request, Response } from "express";
import { Customer, SaleInvoice } from "../../../models";
import RequestWithUser from "../../../utils/requestWithUser";
import putFile from "../../../utils/s3";
import validateSaleInvoice from "../../../validators/validateSaleInvoice";
import fs from 'fs';
import { generateSaleInvoicePDF } from "../../../utils/pdf-generation/generatePDF";

export default async function controllerPost(
  req: Request,
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
    const latest: any = await SaleInvoice.find({}).sort({_id: -1}).limit(1);
    data.invoice = `INV-${parseInt(latest[0].invoice.split('-')[1])+1}`;
    const saleInvoice: any = await SaleInvoice.create(data);
    const uploadedInvoice = await SaleInvoice.findById(saleInvoice._id).populate(["customer", "tcsTax"]);
    const pathToFile = await generateSaleInvoicePDF(uploadedInvoice.toJSON())
    const file = await fs.readFileSync(pathToFile);
    await putFile(file, `${uploadedInvoice._id}.pdf`);
    const invoice = await SaleInvoice.findByIdAndUpdate(uploadedInvoice._id, { pdf_url: `https://knmulti.fra1.digitaloceanspaces.com/${uploadedInvoice._id}.pdf` }, { new: true});
    await fs.rmSync(pathToFile);
    res.status(200).send(invoice);
  } catch (e) {
    console.log(e)
    res.status(500).json({ msg: "Server Error: Sale Estimate data couldn't be created" });
  }

}
