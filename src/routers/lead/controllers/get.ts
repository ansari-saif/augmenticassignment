// create an express get route for lead model

import { Request, Response } from "express";
import { Lead } from "../../../models";

export default async function controllerGet(req: Request, res: Response) {
  const { id } = req.params;
  if (id) {
    const lead = await Lead.findById(id)
    if (!lead) {
      return res.status(404).send({ message: "Lead not found" });
    } else {
      return res.status(200).send(lead);
    }
  } else {
    const leads = await Lead.find({})
    res.status(200).send(leads);
  }
}
