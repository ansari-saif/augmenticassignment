// create an express post route for the goal controller

import { Request, Response } from "express";
import { RecurringInvoice } from "../../../models/recurringInvoice";
import validateRecurringInvoice from "../../../validators/validateRecurringInvoice";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validateRecurringInvoice(data);
  if (errors.length) {
    console.log({ errors })
    res.status(400).json({ errors });
    return;
  }
  
  const invoice = new RecurringInvoice(data);
  invoice.save((err, goal) => {
    if (err) {
      res.status(500).json(err);
    } else {
      console.log(invoice)
      res.status(201).json(invoice);
    }
  });
}
