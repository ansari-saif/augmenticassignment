// create an express post route for the goal controller

import { Request, Response } from "express";
import { SalesOrder } from "../../../models/salesOrder";
import validateSalesOrder from "../../../validators/validateSalesOrder";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  console.log(data);
  const errors = validateSalesOrder(data);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  const order = new SalesOrder(data);
  order.save((err, goal) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(order);
    }
  });
}
