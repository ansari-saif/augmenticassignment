// create an epxress delete controller for the saleEstimate model

import { Request, Response } from "express";
import { SaleEstimate } from "../../../models/saleEstimate";

export default async function controllerDelete(req: Request, res: Response) {
  const { id } = req.params;
  const saleEstimate = await SaleEstimate.findByIdAndDelete(id);
  if (!saleEstimate) {
    return res.status(404).json({ message: "SaleEstimate not found" });
  }
  return res.status(200).json(saleEstimate);
}
