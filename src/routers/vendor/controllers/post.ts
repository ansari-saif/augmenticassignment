// create a express post route for the vendor model

import { Request, Response } from "express";
import { Vendor } from "../../../models";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const vendor = new Vendor(data);
  vendor.save((err, vendor) => {
    if (err) return res.status(400).json(err);
    res.status(201).json(vendor);
  });
}
