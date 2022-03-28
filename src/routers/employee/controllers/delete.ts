import { Request, Response } from "express";
import { Employee } from "../../../models/employee";

export default async function controllerDelete(req: Request, res: Response) {
  const { id } = req.params;
  if (id) {
    const employee = await Employee.findByIdAndDelete(id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } else {
    res.status(400).json({ message: "Employee id is required" });
  }
}
