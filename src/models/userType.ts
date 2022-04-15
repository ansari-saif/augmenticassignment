import { model } from "mongoose";
import { IUserType, userTypeSchema } from "../db/schema/userType";


export const UserType = model<IUserType>(
  "UserType",
  userTypeSchema
);