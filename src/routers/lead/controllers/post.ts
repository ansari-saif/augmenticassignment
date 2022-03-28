import { Response } from "express";
import { Lead } from "../../../models";
import RequestWithUser from "../../../utils/requestWithUser";

export default async function controllerPost(
  req: RequestWithUser,
  res: Response
) {
  const data = req.body;
  const lead = new Lead({
    ...data,
    createdBy: req.user.id,
    assignedTo: req.user.id,
  });
  lead.save((err, lead) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send(lead);
  });
}
