import { Document, Schema, Types } from "mongoose";

interface ICustomer extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  invoices: number[];
  creditNotes: number[];
  description: string;
}

const customerSchema = new Schema<ICustomer>(
  {
    name: String,
    email: String,
    phone: String,
    company: String,
    address: String,
    creditNotes: [{ type: Number, ref: "CreditNote" }],
    invoices: [
      {
        type: Number,
        ref: "SaleInvoice",
      },
    ],
    description: String,
  },
  {
    timestamps: true,
  }
);

export { ICustomer, customerSchema };
