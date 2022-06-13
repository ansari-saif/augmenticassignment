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

  const recurringInvoice = await RecurringInvoice.create(data);
  let today = moment().format('YYYY-MM-DD');
  res.status(200).json(recurringInvoice);
}
