import { Request, Response } from "express";
import { Stock } from "../../../models/stock";

export default async function controllerPut(req: Request, res: Response) {
  try {
    
    const { id } = req.params;
    const stock = await Stock.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(stock);

  } catch (err) {
    res.status(500).json({ msg : "Stock was not updated" })
  }
} 