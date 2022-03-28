// create an express put route for the creditNote model

import { Request, Response } from "express";
import { CreditNote } from "../../../models";

export default async function controllerPut(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  if (id) {
    const note = await CreditNote.findByIdAndUpdate(id, data);
    if (!note) {
      return res.status(404).json({ message: "SaleInvoice not found" });
    }
    return res.status(200).json(note);
  }
  const notes = await CreditNote.find({});
  return res.status(200).json(notes);
}
