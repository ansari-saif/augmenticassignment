// create an express get request handle for customer/:id and all customer

import { Request, Response } from "express";
import { Customer } from "../../../models";

export default async function controllerGet(req: Request, res: Response) {
  const { id } = req.params;
  // console.log(id);
  // console.log(id);
  // console.log(id);
  // console.log(id);
  if (id) {
    const customer = await Customer.findById(id)
      .populate("invoices");
    if (!customer) {
      return res.status(404).send({ message: "Lead not found" });
    }
    // console.log(customer);
    return res.status(200).send(customer);
  } else {
    const customers = await Customer.find()
    // console.log(customers);
    return res.status(200).send(customers);
  }
}
