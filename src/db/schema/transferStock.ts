import { Schema, Document, Types } from "mongoose";


interface ITransferStock extends Document {
  date: Date;
  stockId: Types.ObjectId;
  splitStockId: Types.ObjectId;
  transferQuantity: Number;
  projectFrom: Types.ObjectId;
  projectTo: Types.ObjectId;
}

const transferStockSchema = new Schema<ITransferStock>({
  date: Date,
  stockId: { type: Schema.Types.ObjectId, ref: "Stock" },
  splitStockId: { type: Schema.Types.ObjectId, ref: "SplitStock" },
  transferQuantity: Number,
  projectFrom: { type: Schema.Types.ObjectId, ref: "Project" },
  projectTo: { type: Schema.Types.ObjectId, ref: "Project" },
});

export { ITransferStock, transferStockSchema };