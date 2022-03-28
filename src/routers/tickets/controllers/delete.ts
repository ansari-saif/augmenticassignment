// create an express delete route for tickets

import { Request, Response } from "express";
import { Ticket } from "../../../models";

export default async function controllerDelete(req: Request, res: Response) {
  const { id } = req.params;
  const ticket = await Ticket.findById(id);
  if (!ticket) {
    return res.status(404).json({
      message: "Ticket not found",
    });
  }
  await ticket.remove();
  return res.status(200).json({
    message: "Ticket deleted",
  });
}
