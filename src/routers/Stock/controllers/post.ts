
import { Request, Response } from "express";
import { Stock } from "../../../models/stock";

export default async function controllerPost(req: Request, res: Response) {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ msg : "stocks wasn't created" })
  }
}
 