// create an epxress post route for the creditNote model

import { Request, Response } from "express";
import { CreditNote } from "../../../models";
import putFile from "../../../utils/s3";
import validateCreditNotes from "../../../validators/validateCreditNotes";
import fs from 'fs';
import { generateCreditNotePDF } from "../../../utils/pdf-generation/generatePDF";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validateCreditNotes(data);
  if (errors.length) {
    console.log(errors);
    res.status(400).json({ errors });
    return;
  }
  try {
    const note : any  = await CreditNote.create(data);
    const uploadedNotes = await CreditNote.findOne({ _id: note._id }).populate(["customer"]);
    const pathToFile = await generateCreditNotePDF(uploadedNotes.toJSON());
    const file = await fs.readFileSync(pathToFile);
    await putFile(file, `${uploadedNotes._id}.pdf`);
    await CreditNote.updateOne({ _id : uploadedNotes._id }, { pdf_url: `https://knmulti.fra1.digitaloceanspaces.com/${uploadedNotes._id}.pdf` });
    await fs.rmSync(pathToFile);
    res.status(200).json({...note._doc, pdf_url: `https://knmulti.fra1.digitaloceanspaces.com/${uploadedNotes._id}.pdf`});
  } catch (e) {
    res.status(500).json({ msg: "Server Error: Sale Estimate data couldn't be created" });
  }
}