// create an express post route for the goal controller

import { Request, Response } from "express";
import { SaleEstimate } from "../../../models/saleEstimate";
import { generateSaleEstimatePDF } from "../../../utils/pdf-generation/generatePDF";
import validateSalesEstimate from "../../../validators/validateSaleEstimate";
import fs from 'fs';
import putFile from "../../../utils/s3";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validateSalesEstimate(data);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  try {
    const estimate : any  = await SaleEstimate.create(data);
    const uploadedEstimate = await SaleEstimate.findOne({ _id: estimate._id }).populate(["customer", "tax"]);
    const pathToFile = await generateSaleEstimatePDF(uploadedEstimate.toJSON())
    const file = await fs.readFileSync(pathToFile);
    await putFile(file, `${uploadedEstimate._id}.pdf`);
    const saleEstimate = await SaleEstimate.findByIdAndUpdate(
      uploadedEstimate._id, 
      { pdf_url: `https://knmulti.fra1.digitaloceanspaces.com/${uploadedEstimate._id}.pdf` },
      { new: true }
    );
    await fs.rmSync(pathToFile);
    console.log(saleEstimate);
    return res.status(200).json(saleEstimate);
  } catch (e) {
    return res.status(500).json({ msg: "Server Error: Sale Estimate data couldn't be created" });
  }
}
