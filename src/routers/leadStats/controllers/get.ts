// export an express get controller for the saleINvoice model

import { Request, Response } from "express";
import { LeadStatus } from "../../../models/LeadStatus";

export async function controllerGet(req: Request, res: Response) {
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

export async function controllerGetStatusList(request: Request, res: Response) {
  const status = await LeadStatus.find();
  status.sort((a,b) => a.position - b.position)
  let statusObj = {};
  status.forEach((stat) => {
    statusObj = {
      ...statusObj,
      [stat.name]: {
        name: stat.name,
        position: stat.position,
        id: stat._id,
        items: [],
        allowed: stat.allowed,
        background: '#EC453A',
        color: '#fff',
      }
    }
  });
  res.status(200).json(statusObj)
}