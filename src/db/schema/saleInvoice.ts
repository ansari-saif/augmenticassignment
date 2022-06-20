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

interface CreditDetails {
  id: Types.ObjectId,
  credited: number;
}

interface PaymentReceived {
  id: Types.ObjectId;
  payment: string;
  paymentMode: string;
  amount: number;
}

interface ISaleInvoice extends Document {
  amount: number;
  customer: Types.ObjectId;
  customerNotes: string;
  discount: string;
  dueDate: Date;
  employee: Number;
  project: Types.ObjectId;
  grandTotal: number;
  paidAmount: number;
  withholdingTax: number;
  invoice: string;
  invoiceDate: Date;
  estimate: Types.ObjectId;
  salesOrder: Types.ObjectId;
  deliveryChallan: Types.ObjectId;
  items: Item[];
  credits: number;
  creditNotes: [Types.ObjectId];
  creditDetails: [CreditDetails];
  paymentReceived: [PaymentReceived]
  pdf_url: String,
  orderNumber: string;
  termsAndConditions: string;
  terms: string;
  adjustments: number;
  taxType: string;
  taxationAmount: number;
  taxationPercentage: number
  tcsTax: Types.ObjectId;
  tdsType: string;
  status: string;
  // 
}

const saleInvoiceSchema = new Schema<ISaleInvoice>(
  {
    employee: { type: Number, ref: "Employee" },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
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
    pdf_url: String,
    withholdingTax: { type: Number, default: 0 },
    paymentReceived: [{
      id: { type: Schema.Types.ObjectId, ref: 'SalePayment' },
      payment: String,
      paymentMode: String,
      amount: Number,
    }],
    adjustments: Number,
    taxType: String,
    taxationAmount: Number,
    taxationPercentage: Number,
    tcsTax: { type: Schema.Types.ObjectId, ref: "Tax" },
    tdsType: String,
    estimate: { type: Schema.Types.ObjectId, ref: 'saleEstimate' },  
    salesOrder: { type: Schema.Types.ObjectId, ref: 'saleOrder' },  
    deliveryChallan: { type: Schema.Types.ObjectId, ref: 'deliveryChallan' },  
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    credits: { type: Number, default: 0 },
    creditNotes: [{ type:Types.ObjectId, ref: "CreditNotes" }],
    creditDetails: [
      {
        id: { type: Schema.Types.ObjectId, ref: 'CreditNotes' },
        credited: Number,
      }
    ],
    items: [
      {
        item: String,
        description: String,
        unitCost: String,
        quantity: String,
        amount: Number,
      },
    ],
    status: { type: String, default: 'DRAFT' },
  },
  { timestamps: true }
);

export { ISaleInvoice, saleInvoiceSchema };
