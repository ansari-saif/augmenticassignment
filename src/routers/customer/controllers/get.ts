// create an express get request handle for customer/:id and all customer

import { Request, Response } from "express";
import { Customer } from "../../../models";

export default async function controllerGet(req: Request, res: Response) {
  const { id } = req.params;
  if (id) {
    const customer = await Customer.findById(id)
      .populate("invoices");
    if (!customer) {
      return res.status(404).send({ message: "Lead not found" });
    }
    return res.status(200).send(customer);
  } else {
    const customers = await Customer.find()
    return res.status(200).send(customers);
  }
}
