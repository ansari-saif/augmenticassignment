// create an express get controller for the salePayment model

import { Request, Response } from "express";
import { SalePayment } from "../../../models/salePayment";

export default async function controllerGet(req: Request, res: Response) {
  const { id } = req.params;
  if (id) {
    console.log(id);
    const salePayment = await SalePayment.findById(id)
      .populate("customer")
      .populate("invoice");
    console.log(salePayment);
    if (!salePayment) {
      return res.status(404).json({ message: "SalePayment not found" });
    }
    return res.status(200).json(salePayment);
  }
  const salePayments = await SalePayment.find({})
    .populate('customer')
    .populate("invoice")
  return res.status(200).json(salePayments);
}
