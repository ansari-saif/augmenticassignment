// create an express delete controller for the salePayment modle

import { Request, Response } from "express";
import { SalesOrder } from "../../../models";
import { deleteFile } from "../../../utils/s3";

export default async function controllerDelete(req: Request, res: Response) {
  const { id } = req.params;
  const salesOrder = await SalesOrder.findByIdAndDelete(id);
  if (!salesOrder) {
    return res.status(404).json({ message: "SalePayment not found" });
  }
  await deleteFile(`${id}.pdf`);
  return res.status(200).json(salesOrder);
}
