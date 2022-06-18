// create an expres deleet route for the creditNote model

import { Request, Response } from "express";
import { CreditNote } from "../../../models";

export default async function controllerDelete(req: Request, res: Response) {
  const { id } = req.params;
  if (id) {
    const note = await CreditNote.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: "Credit Note not found" });
    }
    return res.status(200).json(note);
  }
  const notes = await CreditNote.find({});
  return res.status(200).json(notes);
}
