
import { Request, Response } from "express";
import { LandSale } from "../../../models/landSale";

export default async function controllerPost(req: Request, res: Response) {
  try {
    const landSale = await LandSale.create(req.body);
    res.status(201).json(landSale);
  } catch (err) {
    res.status(500).json({ msg : "land Sales wasn't created" })
  }
}