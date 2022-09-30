import { Document, Schema, Types } from "mongoose";
import { SaleEstimate } from "../../models/saleEstimate";

interface Item {
  item: string;
  description: string;
  unitCost: string;
  quantity: string;
  amount: number;
}

interface ISaleEstimate extends Document {
  employee: Number;
  project: String;
  tax: Types.ObjectId;
  estimateDate: Date;
  expiryDate: Date;
  taxAmount: number;
  discount: number;
  adjustment: number;
  amount: number;
  customerNotes: string;
  termsAndConditions: string;
  items: Item[];
  status: string;
  // 
  estimate: string;
  isInvoiced: boolean;
  reference: string;
  subject: string;
  grandTotal: number;
  customer: Types.ObjectId; 
  pdf_url?:string;
}

const saleEstimateSchema = new Schema(
  {
    employee: { type: Number, ref: "Employee" },
    project: { type: String, ref: "Project" },
    tax: { type: Schema.Types.ObjectId, ref: "Tax" },
    estimateDate: Date,
    expiryDate: Date,
    taxAmount: Number,
    discount: Number,
    adjustment: Number,
    amount: Number,
    customerNotes: String,
    termsAndConditions: String,
    estimate: String,
    isInvoiced: { type: Boolean, default: false},
    reference: String,
    subject: String,
    status: { type: String, default: 'OPEN' },
    grandTotal: Number,
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    items: [
      {
        item: String,
        description: String,
        unitCost: String,
        quantity: String,
        amount: Number,
      },
    ],
    pdf_url: String,
  },
  { timestamps: true },
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
