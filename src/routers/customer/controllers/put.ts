// create an expres put request handle for customer/:id

import { Request, Response } from "express";
import { Customer } from "../../../models";

export default async function controllerPut(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  if (!id) {
    return res.status(400).send({ message: "No id provided" });
  }
  const customer = await Customer.findByIdAndUpdate(id, data);
  if (!customer) {
    return res.status(404).send({ message: "Customer not found" });
  }
  return res.status(200).send(customer);
}
