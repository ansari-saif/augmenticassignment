import { Document, Schema, Types } from "mongoose";
import { SaleEstimate } from "../../models/saleEstimate";

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

interface ISaleEstimate extends Document {
  employee: Number;
  project: String;
  tax: Types.ObjectId;
  estimateDate: Date;
  expiryDate: Date;
  taxAmount: number;
  discount: string;
  amount: number;
  customerNotes: string;
  termsAndConditions: string;
  items: Item[];
  // 
  estimate: string;
  reference: string;
  subject: string;
  grandTotal: number;
  customer: Customer; 
}

const saleEstimateSchema = new Schema(
  {
    employee: { type: Number, ref: "Employee" },
    project: { type: String, ref: "Project" },
    tax: { type: Schema.Types.ObjectId, ref: "Tax" },
    estimateDate: Date,
    expiryDate: Date,
    taxAmount: Number,
    discount: String,
    amount: Number,
    customerNotes: String,
    termsAndConditions: String,
    estimate: String,
    reference: String,
    subject: String,
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

saleEstimateSchema.pre("save", function (next) {
  if (this.isNew) {
    SaleEstimate.countDocuments({}, (err: any, count: any) => {
      if (err) return next(err);
      this._id = count + 1;
      next();
    });
  } else next();
});

export { ISaleEstimate, saleEstimateSchema };
