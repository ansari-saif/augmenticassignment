// export an express get controller for the saleINvoice model

import { Request, Response } from "express";
import { Lead } from "../../../models";
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
  const status = await LeadStatus.find();
  status.sort((a,b) => a.position - b.position);
  return res.status(200).json(status);
};

export async function controllerGetStatusList(req: Request, res: Response) {
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

export async function controllerGetStatusLeads(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const leads = await Lead.find({ status: id });
    if (leads.length > 0) {
      res.status(200).send({ length: leads.length });
    } else {
      await LeadStatus.findByIdAndDelete(id)
      res.status(200).send({ msg: 'deleted successfully' });
    }
  } catch (err) {
    console.log(err)
  }
}