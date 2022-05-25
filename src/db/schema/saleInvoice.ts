import { Document, Schema, Types } from "mongoose";
import { SaleInvoice, Customer } from "../../models";
import { Employee } from "../../models/employee";

interface Item {
  item: string;
  description: string;
  unitCost: string;
  quantity: string;
  amount: number;
}

interface Customer {
  email: string;
  name: string;
  id: Types.ObjectId;
}

interface ISaleInvoice extends Document {
  amount: number;
  customer: Customer;
  customerNotes: string;
  discount: string;
  dueDate: Date;
  employee: Number;
  grandTotal: number;
  paidAmount: number;
  withholdingTax: number;
  invoice: string;
  invoiceDate: Date;
  items: Item[];
  orderNumber: string;
  termsAndConditions: string;
  terms: string;
  adjustments: number;
  taxType: string;
  taxationAmount: number;
  taxationPercentage: number
  tcsTax: Types.ObjectId;
  tdsType: string;
  // 
}

const saleInvoiceSchema = new Schema<ISaleInvoice>(
  {
    employee: { type: Number, ref: "Employee" },
    invoiceDate: Date,
    dueDate: Date,
    discount: String,
    amount: Number,
    terms: String,
    customerNotes: String,
    orderNumber: String,
    termsAndConditions: String,
    invoice: String,
    grandTotal: Number,
    paidAmount: { type: Number, default: 0 },
    withholdingTax: { type: Number, default: 0 },
    adjustments: Number,
    taxType: String,
    taxationAmount: Number,
    taxationPercentage: Number,
    tcsTax: { type: Schema.Types.ObjectId, ref: "Tax" },
    tdsType: String,  
    customer: 
      {
        id: { type: Schema.Types.ObjectId, ref: "Customer" },
        name: String,
        email: String,
      }
    ,
    items: [
      {
        item: String,
        description: String,
        unitCost: String,
        quantity: String,
        amount: Number,
      },
    ],
  },
  { timestamps: true }
);

export { ISaleInvoice, saleInvoiceSchema };
