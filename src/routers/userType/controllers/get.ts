import { Request, Response } from "express";
import { UserType } from "../../../models/userType";


export default async function userTypeGet(req: Request, res: Response) {
  try {
    const userType = await UserType.find();
    res.status(200).json(userType);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
}