// create an express post route for the saleInvoice controller

import { Request, Response } from "express";
import { SaleInvoice } from "../../../models";
import RequestWithUser from "../../../utils/requestWithUser";

export default async function controllerPost(
  req: RequestWithUser,
  res: Response
) {
  const data = req.body;
  const saleInvoice = new SaleInvoice({ ...data, createdBy: req.user.id });
  saleInvoice.save((err, invoice) => {
    if (err) {
      res.status(500).json(err);
      return;
    } else {
      res.status(201).json(invoice);
    }
  });
}
