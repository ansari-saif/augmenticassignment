// create an express put route for the employee controller

import { Request, Response } from "express";
import { Employee } from "../../../models/employee";
import { validateEmployee } from "../../../validators";

export default async function controllerPut(req: Request, res: Response) {
  const data = req.body;
  // console.log('data',data);
  const errors = validateEmployee(data);
  if (errors.length) {
    res.status(400).json(errors);
    return;
  }
  const { id } = req.params;
  console.log("sas");
  if (id) {
    console.log("sas");
    const employee = await Employee.findByIdAndUpdate(id, req.body);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } else {
    
    res.status(400).json({ message: "Employee id is required" });
  }
}
