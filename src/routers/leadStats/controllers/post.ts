
import { Request, Response } from "express";
import { LeadStatus } from "../../../models/LeadStatus";

export default async function controllerPost(
  req: Request,
  res: Response
) {
  const data = req.body;
  console.log(data);
}
