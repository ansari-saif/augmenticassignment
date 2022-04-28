import { Request, Response } from "express";
import { DeliveryChallan } from "../../../models";

export default async function controllerGet(req: Request, res: Response) {
  const { id } = req.params;
  if (id) {
    const deliveryChallan = await DeliveryChallan.findById(id);
    if (!deliveryChallan) {
      return res.status(404).json({ message: "SaleEstimate not found" });
    }
    return res.status(200).json(deliveryChallan);
  }
  const deliveryChallan = await DeliveryChallan.find({});
  console.log(deliveryChallan)
  return res.status(200).json(deliveryChallan);
}
