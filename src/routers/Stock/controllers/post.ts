
import { Request, Response } from "express";
import { SplitStock } from "../../../models/splitStock";
import { Stock } from "../../../models/stock";

export default async function controllerPost(req: Request, res: Response) {
  try {
    const stock = await Stock.create(req.body);
    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ msg : "stocks wasn't created" })
  }
}

export async function billStockPost(req: Request, res: Response) {
  try {
    const resArr = req.body;
    resArr.forEach(async (stk : any) => {
      const stock = await Stock.create(stk);
    });
    res.status(201).json({ msg : "stocks was created" });
  } catch (err) {
    res.status(500).json({ msg : "stocks wasn't created" })
  }
}

export async function splitStockPost(req: Request, res: Response) {
  try {
    const resArr = req.body;
    resArr.forEach(async (stk : any) => {
      const splitStock = await SplitStock.create(stk);
    });
    res.status(201).json({ msg : "Split stocks was created" });
  } catch (err) {
    res.status(500).json({ msg : "Split stocks wasn't created" })
  }
}
 