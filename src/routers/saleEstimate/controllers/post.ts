// create an express post route for the goal controller

import { Request, Response } from "express";
import { SaleEstimate } from "../../../models/saleEstimate";
import validateSalesEstimate from "../../../validators/validateSaleEstimate";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validateSalesEstimate(data);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  const goal = new SaleEstimate(data);
  goal.save((err, goal) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(goal);
    }
  });
}
