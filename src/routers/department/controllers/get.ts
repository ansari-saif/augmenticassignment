import { Request, Response } from "express";
import { Department } from "../../../models";

export default async function controllerGet(
  req: Request,
  res: Response
): Promise<void> {
  const departments = await Department.find({});
  res.status(200).json(departments);
}
