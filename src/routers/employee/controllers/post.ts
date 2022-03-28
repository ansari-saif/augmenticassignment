import { Request, Response } from "express";
import { Employee } from "../../../models/employee";
import { validateEmployee } from "../../../validators";
import bcrypt from "bcryptjs";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validateEmployee(data);
  if (errors.length) {
    res.status(400).json(errors);
    return;
  }
  data.password = await bcrypt.hash(data.password, 10);
  const employee = new Employee(data);
  employee.save((err, employee) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.status(200).json(employee);
  });
}
