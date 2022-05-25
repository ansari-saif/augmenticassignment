// create an express put route for the saleEstimate model

import { Request, Response } from "express";
import { SalesOrder } from "../../../models";
import validateSalesOrder from "../../../validators/validateSalesOrder";

export default async function controllerPut(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const errors = validateSalesOrder(data);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  const salesOrder = await SalesOrder.findByIdAndUpdate(id, data);
  if (!salesOrder) {
    return res.status(404).json({ message: "Sale Order not found" });
  }
  return res.status(200).json(salesOrder);
}
