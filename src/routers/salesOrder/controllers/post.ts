// create an express post route for the goal controller

import { Request, Response } from "express";
import { SalesOrder } from "../../../models/salesOrder";
import { generateSalesOrderPDF } from "../../../utils/pdf-generation/generatePDF";
import putFile from "../../../utils/s3";
import validateSalesOrder from "../../../validators/validateSalesOrder";
import fs from 'fs';

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validateSalesOrder(data);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  try {
    const latest: any = await SalesOrder.find({}).sort({_id: -1}).limit(1);
    if (latest.length > 0 && latest[latest.length-1].salesOrder) {
      data.salesOrder = `SO-${parseInt(latest[0].salesOrder.split('-')[1])+1}`;
    } else {
      data.salesOrder = 'SO-1';
    }
    const order : any  = await SalesOrder.create(data);
    const uploadedOrder = await SalesOrder.findOne({ _id: order._id }).populate(["customer"]);
    const pathToFile: any  = await generateSalesOrderPDF(uploadedOrder.toJSON());
    const file = await fs.readFileSync(pathToFile);
    await putFile(file, `${uploadedOrder._id}.pdf`);
    const saleOrder = await SalesOrder.findByIdAndUpdate(uploadedOrder._id , { pdf_url: `https://knmulti.fra1.digitaloceanspaces.com/${uploadedOrder._id}.pdf` }, { new: true });
    await fs.rmSync(pathToFile);
    res.status(200).json(saleOrder);
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Server Error: Sale Estimate data couldn't be created" });
  }
}
