// create an express post route for the salePayment model

import { Request, Response } from "express";
import { SalePayment } from "../../../models/salePayment";
import { validatePayment } from "../../../validators";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validatePayment(data);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  const salePayment = new SalePayment(data);
  salePayment.save((err, salePayment) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(salePayment);
    }
  });
}
