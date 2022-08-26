// create an expres put request handle for customer/:id

import { Request, Response } from "express";
import { Customer } from "../../../models";
import RequestWithUser from "../../../utils/requestWithUser";

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
  console.log('DONE');
  return res.status(200).send(customer);
}

export async function commentPut(req: RequestWithUser, res: Response) {
  const data = req.body;
  const { id } = req.params;
  const date = new Date();
  const newDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
  try {
    const comment = {
      employee: req.user.id,
      comment: data.commentToAdd,
      date: newDate,
    };
    const customer = await Customer.findByIdAndUpdate(id, { $push: { comments: comment } }, { new: true });
    return res.status(200).json(customer);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
}