// create an express post request handle for customer

import { Request, Response } from "express";
import { Customer } from "../../../models";
import RequestWithUser from "../../../utils/requestWithUser";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const contactPersons: Array<any> = [];
  Object.entries(data.contactPersons).map(([key, value]) => {
    contactPersons.push(value);
  });
  data.contactPersons = contactPersons;
  const customer = new Customer({
    ...data,
  });
  customer.save((err, customer) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(201).send(customer);
  });
}
