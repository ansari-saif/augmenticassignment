import { Document, Schema, Types } from "mongoose";

interface IStock extends Document {
  itemDetails: string;
  stockNo: string;
  quantity: number;
  leftQuantity: number;
  billStatus: string;
  vendorId: Types.ObjectId;
  billId: Types.ObjectId;
  date: Date;
}

const stockSchema = new Schema<IStock>(
  {
    itemDetails: String,
    stockNo: String,
    quantity: Number,
    leftQuantity: Number,
    billStatus: String,
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
    },
    billId: {
      type: Schema.Types.ObjectId,
      ref: "VendorBill",
    },
    date: Date,
  }, {
    toJSON: { virtuals : true },
    toObject: { virtuals : true }
  }
);

stockSchema.virtual("splitStocks", {
  ref: "SplitStock",
  localField: "_id",
  foreignField: "stockId",
  justOne: false
});

export { IStock, stockSchema };
