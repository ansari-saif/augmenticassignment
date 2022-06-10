// create an express delete controller for the salePayment modle

import { Request, Response } from "express";
import { RecurringInvoice } from "../../../models/recurringInvoice";

export default async function controllerDelete(req: Request, res: Response) {
  const { id } = req.params;
  const salesOrder = await RecurringInvoice.findByIdAndDelete(id);
  if (!salesOrder) {
    return res.status(404).json({ message: "SalePayment not found" });
  }
  return res.status(200).json(salesOrder);
}
