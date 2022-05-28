import { Document, Schema, Types } from "mongoose";

interface IStock extends Document {
  itemName: string;
  reqQuantity: number;
  spentFor: string;
  leftQuantity: number;
  totalQuantity : number;
  vendorId: Types.ObjectId;
}

const stockSchema = new Schema<IStock>(
  {
    itemName: String,
    reqQuantity: Number,
    spentFor: String,
    leftQuantity: Number,
    totalQuantity : Number,
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
    },
  }
);

export { IStock, stockSchema };
