// create an express put route for tickets

import { Request, Response } from "express";
import { Ticket } from "../../../models";
import { validateTicket } from "../../../validators";

export default async function controllerPut(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const errors = validateTicket(data);
  if (errors.length > 0) {
    return res.status(400).json({
      errors,
    });
  }
  const ticket = await Ticket.findByIdAndUpdate(id, data);
  return res.status(200).json(ticket);
}
