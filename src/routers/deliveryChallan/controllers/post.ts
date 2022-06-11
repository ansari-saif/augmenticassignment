// create an express post route for the goal controller

import { Request, Response } from "express";
import { DeliveryChallan } from "../../../models";
import { generateDeliveryChallanPDF } from "../../../utils/pdf-generation/generatePDF";
import validateDeliveryChallan from "../../../validators/validateDeliveryChallan";
import fs from 'fs';
import putFile from "../../../utils/s3";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validateDeliveryChallan(data);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  try {
    const challan : any  = await DeliveryChallan.create(data);
    const uploadedChallan = await DeliveryChallan.findOne({ _id: challan._id }).populate(["customer"]);
    const pathToFile = await generateDeliveryChallanPDF(uploadedChallan.toJSON());
    const file = await fs.readFileSync(pathToFile);
    await putFile(file, `${uploadedChallan._id}.pdf`);
    await DeliveryChallan.updateOne({ _id : uploadedChallan._id }, { pdf_url: `https://knmulti.fra1.digitaloceanspaces.com/${uploadedChallan._id}.pdf` });
    await fs.rmSync(pathToFile);
    res.status(200).json({...challan._doc, pdf_url: `https://knmulti.fra1.digitaloceanspaces.com/${uploadedChallan._id}.pdf`});
  } catch (e) {
    res.status(500).json({ msg: "Server Error: Sale Estimate data couldn't be created" });
  }
}
