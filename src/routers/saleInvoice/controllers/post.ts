// create an express post route for the saleInvoice controller

import { Request, Response } from "express";
import { Customer, SaleInvoice } from "../../../models";
import RequestWithUser from "../../../utils/requestWithUser";
import validateSaleInvoice from "../../../validators/validateSaleInvoice";

export default async function controllerPost(
  req: RequestWithUser,
  res: Response
) {
  const data = req.body;
  const errors = validateSaleInvoice(data);
  if (errors.length) {
    console.log(errors)
    res.status(400).json({ errors });
    return;
  }
  const saleInvoice = new SaleInvoice({ ...data, createdBy: req.user.id });
  const customerId = saleInvoice.customer;
  saleInvoice.save(async (err, invoice) => {
    if (err) {
      res.status(500).json(err);
      return;
    } else {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,
        {
          $push: { invoices: invoice._id }
        },
      );
      res.status(201).json({ invoice, updatedCustomer });
    }
  });
}
