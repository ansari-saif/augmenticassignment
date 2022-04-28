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
  email: string;
}

interface IDeliveryChallan extends Document {
  challanDate: Date;
  discount: string;
  amount: number;
  challanType: string;
  customerNotes: string;
  termsAndConditions: string;
  items: Item[];
  deliveryChallan: string;
  reference: string;
  grandTotal: number;
  customer: Customer; 
}

const deliveryChallanSchema = new Schema<IDeliveryChallan>(
  {
    challanDate: Date,
    discount: String,
    amount: Number,
    challanType: String,
    customerNotes: String,
    termsAndConditions: String,
    deliveryChallan: String,
    reference: String,
    grandTotal: Number,
    customer: 
      {
        id: { type: String, ref: "Customer" },
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

export { IDeliveryChallan, deliveryChallanSchema };
