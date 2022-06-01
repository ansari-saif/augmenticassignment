// create an express post route for the goal controller

import { Request, Response } from "express";
import { RecurringInvoice } from "../../../models/recurringInvoice";
import validateRecurringInvoice from "../../../validators/validateRecurringInvoice";
import moment from "moment";


export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validateRecurringInvoice(data);
  if (errors.length) {
    console.log({ errors })
    res.status(400).json({ errors });
    return;
  }
  const today = moment().format('YYYY-MM-DD');
  const startDate = moment(data?.startDate).format('YYYY-MM-DD');
  if (startDate == today) {
    console.log(data);
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
  res.status(201).json(data);
}
