// create an express post route for tickets

import { Request, Response } from "express";
import { Ticket } from "../../../models";
import { validateTicket } from "../../../validators";

export default async function controllerPost(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const errors = validateTicket(data);
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Ticket not created",
      errors,
    });
  }
  const ticket = new Ticket(data);
  await ticket.save();
  return res.status(201).json(ticket);
}
