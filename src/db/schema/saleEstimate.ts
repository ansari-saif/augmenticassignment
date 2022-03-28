import { Document, Schema, Types } from "mongoose";
import { SaleEstimate } from "../../models/saleEstimate";

interface Item {
  item: string;
  description: string;
  unitCost: number;
  quantity: number;
  amount: number;
}

interface ISaleEstimate extends Document {
  id: number;
  lead: Types.ObjectId;
  project: Types.ObjectId;
  clientEmail: string;
  tax: number;
  clientAddress: string;
  billingAddress: string;
  estimateDate: Date;
  expiryDate: Date;
  taxAmount: number;
  discount: number;
  total: number;
  tds: number;
  otherInformation: string;
  items: Item[];
}

const saleEstimateSchema = new Schema(
  {
    id: Number,
    lead: { type: Schema.Types.ObjectId, ref: "Lead" },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    clientEmail: String,
    tax: Number,
    clientAddress: String,
    billingAddress: String,
    estimateDate: Date,
    expiryDate: Date,
    taxAmount: Number,
    discount: Number,
    total: Number,
    tds: Number,
    otherInformation: String,
    items: [
      {
        item: String,
        description: String,
        unitCost: Number,
        quantity: Number,
        amount: Number,
      },
    ],
  },
  { _id: false, timestamps: true }
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
