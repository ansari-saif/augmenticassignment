// create an express put route for salePayment model

import { Request, Response } from "express";
import { SalePayment } from "../../../models/salePayment";
import { validatePayment } from "../../../validators";

export default async function controllerPut(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const errors = validatePayment(data);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  const salePayment = await SalePayment.findByIdAndUpdate(id, data);
  if (!salePayment) {
    return res.status(404).json({ message: "SalePayment not found" });
  }
  return res.status(200).json(salePayment);
}
