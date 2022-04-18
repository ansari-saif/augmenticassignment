// Vendor schema is similar to customer schema.

import { Document, Schema, Types } from "mongoose";
import { Vendor } from "../../models";

interface IVendor extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  vendorType: string;
  projectList: Types.ObjectId[];
  vendorCredits: number[];
  expenses: number[];
  bills: number[];
  description: string;
}

const vendorSchema = new Schema<IVendor>(
  {
    name: String,
    email: String,
    phone: String,
    company: String,
    address: String,
    vendorType: String,
    vendorCredits: [{ type: Number, ref: "VendorCredit" }],
    projectList: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    expenses: [{ type: Number, ref: "Expense" }],
    bills: [{ type: Number, ref: "Bill" }],
    description: String,
  },
  {
    timestamps: true,
  }
);

export { IVendor, vendorSchema };
