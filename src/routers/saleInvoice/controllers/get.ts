// export an express get controller for the saleINvoice model

import { Request, Response } from "express";
import { SaleInvoice } from "../../../models";

export async function controllerGetInvoice(req: Request, res: Response) {
  const { id } = req.params;
  if (id) {
    const saleInvoice = await SaleInvoice.findById(id)
      .populate("customer")
      .populate("project");
    if (!saleInvoice) {
      return res.status(404).json({ message: "SaleInvoice not found" });
    }
    return res.status(200).json(saleInvoice);
  }
  const saleInvoices = await SaleInvoice.find({})
    .populate("customer")
    .populate("project");
  return res.status(200).json(saleInvoices);
}

export async function controllerGetRecurringInvoices(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  if (id) {
    const saleInvoice = await SaleInvoice.find({ customer: id })
      .populate("customer")
      .populate("project");
    if (!saleInvoice) {
      return res.status(404).json({ message: "SaleInvoice not found" });
    }
    return res.status(200).json(saleInvoice);
  }
  const saleInvoices = await SaleInvoice.find({
    type: "Recurring",
  })
    .populate("customer")
    .populate("project");
  return res.status(200).json(saleInvoices);
}
