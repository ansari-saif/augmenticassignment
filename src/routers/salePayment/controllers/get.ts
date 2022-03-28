// create an express get controller for the salePayment model

import { Request, Response } from "express";
import { SalePayment } from "../../../models/salePayment";

export default async function controllerGet(req: Request, res: Response) {
  const { id } = req.params;
  if (id) {
    const salePayment = await SalePayment.findById(id)
      .populate("invoice")
      .populate("customer");
    if (!salePayment) {
      return res.status(404).json({ message: "SalePayment not found" });
    }
    return res.status(200).json(salePayment);
  }
  const salePayments = await SalePayment.find({})
    .populate("invoice")
    .populate("customer");
  return res.status(200).json(salePayments);
}
