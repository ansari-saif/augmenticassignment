// create an epxress post route for the creditNote model

import { Request, Response } from "express";
import { CreditNote } from "../../../models";
import validateCreditNotes from "../../../validators/validateCreditNotes";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  console.log(data);
  const errors = validateCreditNotes(data);
  if (errors.length) {
    console.log(errors);
    res.status(400).json({ errors });
    return;
  }
  const note = new CreditNote(data);
  note.save((err, note) => {
    if (err) {
      return res.status(500).json(err);
    }
    console.log(note);
    return res.status(200).json(note);
  });
}
