// create an express post route for the goal controller

import { Request, Response } from "express";
import { DeliveryChallan } from "../../../models";
import validateDeliveryChallan from "../../../validators/validateDeliveryChallan";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  console.log(data);
  const errors = validateDeliveryChallan(data);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  const deliveryChallan = new DeliveryChallan(data);
  deliveryChallan.save((err, goal) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(201).json(deliveryChallan);
    }
  });
}
