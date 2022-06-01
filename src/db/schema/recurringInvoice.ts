import { Document, Schema, Types } from "mongoose";

interface Item {
  item: string;
  description: string;
  unitCost: string;
  quantity: string;
  amount: number;
}

interface Customer {
  id: string;
  name: string;
  email: Types.ObjectId;
}

interface ChildInvoice {
  id: Types.ObjectId;
}


interface IRecurringInvoice extends Document {
  adjustments: number;
  amount: number;
  customer: Customer;
  customerNotes: string;
  discount: string;
  employee: number;
  endDate: Date;
  frequencyUnit: string;
  frequency: number;
  grandTotal: number;
  items: Item[];
  neverExpires: boolean;
  orderNumber: string;
  profileName: string;
  startDate: Date;
  nextDate: Date;
  termsAndConditions: string;
  childInvoices: ChildInvoice[];
  status: string;
  // 
  paidAmount: number;
  withholdingTax: number;
  terms: string;
}

const recurringInvoiceSchema = new Schema<IRecurringInvoice>(
  {
    employee: { type: Number, ref: "Employee" },
    startDate: Date,
    nextDate: Date,
    endDate: Date,
    discount: String,
    amount: Number,
    terms: String,
    customerNotes: String,
    orderNumber: String,
    termsAndConditions: String,
    profileName: String,
    grandTotal: Number,
    paidAmount: { type: Number, default: 0 },
    withholdingTax: { type: Number, default: 0 },
    adjustments: Number,
    frequencyUnit: String,
    frequency: Number,
    status: String,
    neverExpires: {type:Boolean, default: false},
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
    childInvoices: [
      {
        id: { type: Schema.Types.ObjectId, ref: "SaleInvoice", default: '' },
      }
    ]
  },
  { timestamps: true }
);

export { IRecurringInvoice, recurringInvoiceSchema };