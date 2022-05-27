
import { Request, Response } from "express";
import { Stock } from "../../../models/stock";

export default async function controllerDelete(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await Stock.findByIdAndRemove(id);
    res.status(200).json({ msg : "Stock Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "stock not deleted"})
  }
} 