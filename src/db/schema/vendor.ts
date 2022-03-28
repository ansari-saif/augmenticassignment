// Vendor schema is similar to customer schema.

import { Document, Schema } from "mongoose";
import { Vendor } from "../../models";

interface IVendor extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
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
    vendorCredits: [{ type: Number, ref: "VendorCredit" }],
    expenses: [{ type: Number, ref: "Expense" }],
    bills: [{ type: Number, ref: "Bill" }],
    description: String,
  },
  {
    timestamps: true,
  }
);

export { IVendor, vendorSchema };
