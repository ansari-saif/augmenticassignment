// create a get controller for leave

import { Request, Response } from "express";
import { IEmployee } from "../../../db/schema/employee";
import { Leave } from "../../../models";

interface RequestWithUser extends Request {
  user: IEmployee;
}

export default async function controllerGet(
  req: RequestWithUser,
  res: Response
) {
  const employee = req.user;
  const employeeLeaves = await Leave.find({ employee: employee._id });
  res.status(200).json(employeeLeaves);
}
