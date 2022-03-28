// create an epxress post route for the creditNote model

import { Request, Response } from "express";
import { CreditNote } from "../../../models";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const note = new CreditNote(data);
  note.save((err, note) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(note);
  });
}
