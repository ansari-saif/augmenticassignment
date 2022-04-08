import { Request, Response } from "express";
import { validateTimesheet } from "../../../validators";
import { Timesheet } from "../../../models/timesheet";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validateTimesheet(data);
  if (errors.length) {
    res.status(400).json(errors);
    return;
  }
  const timesheet = new Timesheet(data);
  timesheet.save((err, timesheet) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(timesheet);
  });
}
