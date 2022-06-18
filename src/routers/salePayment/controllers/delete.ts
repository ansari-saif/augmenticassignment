// create an express delete controller for the salePayment modle

import { Request, Response } from "express";
import { SalePayment } from "../../../models/salePayment";

export default async function controllerDelete(req: Request, res: Response) {
  const { id } = req.params;
  const salePayment = await SalePayment.findByIdAndDelete(id);
  if (!salePayment) {
    return res.status(404).json({ message: "SalePayment not found" });
  }
  return res.status(200).json(salePayment);
}
