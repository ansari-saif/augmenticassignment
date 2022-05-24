// create an express post route for the goal controller

import { Request, Response } from "express";
import { RecurringInvoice } from "../../../models/recurringInvoice";
import validateRecurringInvoice from "../../../validators/validateRecurringInvoice";
import * as Moment from "moment";
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validateRecurringInvoice(data);
  if (errors.length) {
    console.log({ errors })
    res.status(400).json({ errors });
    return;
  }
  console.log(data);
  if (!data.neverExpires) {
    const start = data.startDate;
    const end = data.endDate;
    const range = moment.range(moment(start), moment(end));
    const dates = Array.from(range.by(data.frequencyUnit.toLowerCase()));
    // todo: filter accroding to the frequency
    let childInvoices = [];
    for (const date in dates) {
      childInvoices.push({
        id: '',
        date: date,
      })
    }
    data.childInvoices = childInvoices;
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
