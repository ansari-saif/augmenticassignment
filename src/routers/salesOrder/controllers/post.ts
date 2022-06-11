// create an express post route for the goal controller

import { Request, Response } from "express";
import { SalesOrder } from "../../../models/salesOrder";
import { generateSalesOrderPDF } from "../../../utils/pdf-generation/generatePDF";
import putFile from "../../../utils/s3";
import validateSalesOrder from "../../../validators/validateSalesOrder";
import fs from 'fs';

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  console.log(data);
  const errors = validateSalesOrder(data);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  try {
    const order : any  = await SalesOrder.create(data);
    const uploadedOrder = await SalesOrder.findOne({ _id: order._id }).populate(["customer"]);
    const pathToFile = await generateSalesOrderPDF(uploadedOrder.toJSON());
    const file = await fs.readFileSync(pathToFile);
    await putFile(file, `${uploadedOrder._id}.pdf`);
    await SalesOrder.updateOne({ _id : uploadedOrder._id }, { pdf_url: `https://knmulti.fra1.digitaloceanspaces.com/${uploadedOrder._id}.pdf` });
    await fs.rmSync(pathToFile);
    res.status(200).json({...order._doc, pdf_url: `https://knmulti.fra1.digitaloceanspaces.com/${uploadedOrder._id}.pdf`});
  } catch (e) {
    res.status(500).json({ msg: "Server Error: Sale Estimate data couldn't be created" });
  }
}
