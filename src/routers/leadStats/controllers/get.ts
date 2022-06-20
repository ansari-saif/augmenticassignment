// export an express get controller for the saleINvoice model

import { Request, Response } from "express";
import { LeadStatus } from "../../../models/LeadStatus";

export default async function controllerGet(req: Request, res: Response) {
  const { id } = req.params;
  if (id) {
    const status = await LeadStatus.findById(id)
    if (!status) {
      return res.status(404).json({ message: "status not found" });
    }
    return res.status(200).json(status);
  }
  const status = await LeadStatus.find()
  return res.status(200).json(status);
};