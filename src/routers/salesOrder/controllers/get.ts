import { Request, Response } from "express";
import { SalesOrder } from "../../../models";

export default async function controllerGet(req: Request, res: Response) {
  const { id } = req.params;
  if (id) {
    const salesOrder = await SalesOrder.findById(id);
    if (!salesOrder) {
      return res.status(404).json({ message: "SaleEstimate not found" });
    }
    return res.status(200).json(salesOrder);
  }
  const salesOrder = await SalesOrder.find({});
  console.log(salesOrder)
  return res.status(200).json(salesOrder);
}
