import { Request, Response } from "express";
import { Stock } from "../../../models/stock";

export default async function controllerGet(req: Request, res: Response) {
  try {
    
    const stocks = await Stock.find(req.query).populate({path: "vendorId", select: "name"});
 
    res.status(200).json(stocks); 

  } catch (err) {
    res.status(500).json({ msg : "Server error" })
  }
}