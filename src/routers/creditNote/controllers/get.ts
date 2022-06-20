// create an express get route for the creditNOte model

import { Request, Response } from "express";
import { CreditNote } from "../../../models";

export default async function controllerGet(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (id) {
      const note = await CreditNote.findById(id)
        .populate("invoices")
        .populate("customer")
      if (!note) {
        return res.status(404).json({ message: "Credit Note not found" });
      }
      return res.status(200).json(note);
    }
    const notes = await CreditNote.find({})
      .populate("customer")
      .populate("invoices")
    console.log(notes);
    return res.status(200).json(notes);
  } catch (err) {
    console.log(err)
  }
}
