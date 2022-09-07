import { Request, Response } from "express";
import { EmployeeTask } from "../../../models";

export default async function controllerDelete(req: Request, res: Response) {
  const { id } = req.params;
  const employeeTask = await EmployeeTask.findByIdAndDelete(id);
  if (!employeeTask) return res.status(404).send("employeeTask not found");
  return res.status(200).send(employeeTask);
}
