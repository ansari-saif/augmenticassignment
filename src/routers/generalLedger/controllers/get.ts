import { Request, Response } from "express";
import { GeneralLedger } from "../../../models/generalLedger";


export default async function generalLedgerGet(req: Request, res: Response) {
  const generalLedger = await GeneralLedger.find();
  res.json(generalLedger);
}