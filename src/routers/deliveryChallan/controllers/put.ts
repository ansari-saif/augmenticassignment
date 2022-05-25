// create an express put route for the saleEstimate model

import { Request, Response } from "express";
import { DeliveryChallan } from "../../../models";
import validateDeliveryChallan from "../../../validators/validateDeliveryChallan";

export default async function controllerPut(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const errors = validateDeliveryChallan(data);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  const deliveryChallan = await DeliveryChallan.findByIdAndUpdate(id, data);
  if (!deliveryChallan) {
    return res.status(404).json({ message: "SaleEstimate not found" });
  }
  console.log(deliveryChallan);
  return res.status(200).json(deliveryChallan);
}
