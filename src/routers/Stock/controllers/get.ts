import { Request, Response } from "express";
import { SplitStock } from "../../../models/splitStock";
import { Stock } from "../../../models/stock";

export default async function controllerGet(req: Request, res: Response) {
  try {
    const populateObj = {
      path: "splitStocks",
      populate: {
        path: "projectId vendorId",
        select: "name"
      }
    };

    const stocks = await Stock.find(req.query).populate({path: "vendorId", select: "name"}).populate(populateObj);
 
    res.status(200).json(stocks); 

  } catch (err) {
    res.status(500).json({ msg : "Server error" })
  }
}

export async function splitStockGet(req: Request, res: Response) {
  try {
     
    const splitStock = await SplitStock.find(req.query).populate("stockId").populate("vendorId").populate({path: "projectId", select: "name"});
 
    res.status(200).json(splitStock); 

  } catch (err) {
    res.status(500).json({ msg : "Server error" })
  }
}