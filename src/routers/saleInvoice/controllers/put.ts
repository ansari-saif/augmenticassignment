
import { Request, Response } from "express";
import { SaleInvoice } from "../../../models";
import validateSaleInvoice from "../../../validators/validateSaleInvoice";

export default async function controllerPut(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const errors = validateSaleInvoice(data);
  if (errors.length) {
    console.log(errors)
    res.status(400).json({ errors });
    return;
  }
  const saleInvoice = await SaleInvoice.findByIdAndUpdate(id, data);
  if (!saleInvoice) {
    return res.status(404).json({ message: "Sale Invoice not found" });
  }
  return res.status(200).json(saleInvoice);
}
