
import { Request, Response } from "express";
import moment from "moment";
import { SplitStock } from "../../../models/splitStock";
import { Stock } from "../../../models/stock";
import { TransferStock } from "../../../models/transferStock";

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

export async function transferStockPost(req: Request, res: Response) {
  try {
    const transferStk : any = await TransferStock.create(req.body);

    const splitStk : any = await SplitStock.findById(transferStk.splitStockId);

    await SplitStock.findByIdAndUpdate(transferStk.splitStockId, { usedQuantity: splitStk.usedQuantity - transferStk.transferQuantity,
    LeftQuantity: splitStk.LeftQuantity - transferStk.transferQuantity
    });
    
    const newSplitStk = {
      stockId: splitStk?.stockId,
      vendorId: splitStk?.vendorId,
      splitStockdate: moment().format("YYYY-MM-DD"),
      splitStockNo: `SPK-${Math.ceil(Math.random()*100000)}`,
      projectId: transferStk?.projectTo,
      usedQuantity: transferStk?.transferQuantity,
      consumedQuantity: 0,
      LeftQuantity: transferStk?.transferQuantity,
      referenceNo: splitStk?.referenceNo,
      purpose: splitStk?.purpose,
      stockUsed: 0
    }

    await SplitStock.create(newSplitStk);

    res.status(201).json({ msg : "Stocks transferd sucessfully" })
    
  } catch (err) {
    res.status(500).json({ msg : "Transfer of Stock doesn't happened" })
  }
}
 