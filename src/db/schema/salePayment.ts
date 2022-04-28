import { Document, Schema, Types } from "mongoose";
import { SaleInvoice } from "../../models";

interface Customer {
  id: Types.ObjectId;
  name: string;
  email: string;
}

type invoiceId = Types.ObjectId;

interface ISalePayment extends Document {
  invoice: Types.ObjectId;
  customer: Customer;
  paymentDate: Date;
  paymentAmount: number;
  paymentMode: string;
  invoices: Array<invoiceId>;
  TdsTaxAcc: string;
  amountReceived: number;
  bankCharges: number;
  depositTo: string;
  excessAmount: number;
  ifTax: boolean;
  notes: string;
  paymentNumber: string;
  reference: string;
  withholdingTax: number;
}

const salePaymentSchema = new Schema<ISalePayment>(
  {
    invoice: { type: Number, ref: "SaleInvoice" },
    customer: { 
      id: { type: Schema.Types.ObjectId, ref: "Customer" },
      name: String,
      email: String,
    },
    paymentDate: Date,
    paymentAmount: Number,
    paymentMode: String,
    TdsTaxAcc: String,
    invoices: [
      { type: Schema.Types.ObjectId, ref: "SaleInvoice"}
    ],
    amountReceived: Number,
    bankCharges: { type: Number, default: 0 },
    depositTo: String,
    excessAmount: { type: Number, default: 0 },
    ifTax: Boolean,
    notes: String,
    paymentNumber: String,
    reference: String,
    withholdingTax: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export { ISalePayment, salePaymentSchema };