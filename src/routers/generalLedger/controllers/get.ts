import { Request, Response } from "express";
import { Customer, Vendor } from "../../../models";
import { Employee } from "../../../models/employee";
import { GeneralLedger } from "../../../models/generalLedger";


export default async function generalLedgerGet(req: Request, res: Response) {
  const generalLedger = await GeneralLedger.find();
  res.status(200).json(generalLedger);
}

export async function userTypeGet(req: Request, res: Response) {
  const employee = await Employee.find().select("firstName lastName");
  const vendor = await Vendor.find().select("name");
  const customer = await Customer.find().select("name");

  // let employee = employeeList.map(emp => {
  //   let name = emp.firstName + " " + emp.lastName;
  //   // console.log(name);
  //   return { ...emp, name }
  // });

  const userTypeList = {
    vendor,
    customer,
    employee,
  }

  res.status(200).json(userTypeList);
}

export async function getTransectionByUserId(req: Request, res: Response){
  const userTransaction = await GeneralLedger.find(req.query);
  res.status(200).json(userTransaction);
}