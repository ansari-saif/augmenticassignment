// create an express delete controller for the salePayment modle

import { Request, Response } from "express";
import { DeliveryChallan } from "../../../models";

export default async function controllerDelete(req: Request, res: Response) {
  const { id } = req.params;
  const deliveryChallan = await DeliveryChallan.findByIdAndDelete(id);
  if (!deliveryChallan) {
    return res.status(404).json({ message: "SalePayment not found" });
  }
  return res.status(200).json(deliveryChallan);
}