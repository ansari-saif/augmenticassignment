import { Document, Schema, Types } from "mongoose";

interface Item {
  item: string;
  description: string;
  unitCost: string;
  quantity: string;
  amount: number;
}

interface Customer {
  id: Types.ObjectId;
  name: string;
  email: string;
}

interface ISalesOrder extends Document {
  employee: Number;
  project: String;
  orderDate: Date;
  shipmentDate: Date;
  delivery: string;
  discount: string;
  amount: number;
  paymentTerms: string;
  customerNotes: string;
  termsAndConditions: string;
  items: Item[];
  // 
  salesOrder: string;
  reference: string;
  grandTotal: number;
  customer: Customer; 
}

const salesOrderSchema = new Schema<ISalesOrder>(
  {
    employee: { type: Number, ref: "Employee" },
    project: { type: String, ref: "Project" },
    delivery: String,
    orderDate: Date,
    shipmentDate: Date,
    discount: String,
    amount: Number,
    paymentTerms: String,
    customerNotes: String,
    termsAndConditions: String,
    salesOrder: String,
    reference: String,
    grandTotal: Number,
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

export { ISalesOrder, salesOrderSchema };
