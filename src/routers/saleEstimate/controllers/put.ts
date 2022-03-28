// create an express put route for the saleEstimate model

import { Request, Response } from "express";
import { SaleEstimate } from "../../../models/saleEstimate";
import validateSalesEstimate from "../../../validators/validateSaleEstimate";

export default async function controllerPut(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const errors = validateSalesEstimate(data);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  const saleEstimate = await SaleEstimate.findByIdAndUpdate(id, data);
  if (!saleEstimate) {
    return res.status(404).json({ message: "SaleEstimate not found" });
  }
  return res.status(200).json(saleEstimate);
}
