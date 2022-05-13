import { Document, Schema, Types } from "mongoose";

interface IVendorExpense extends Document {
  expenseDate: Date;
  expenseAccount: string;
  expenseAmount: number;
  paymentThrough: string;
  vendorId?: Types.ObjectId;
  invoiceId: string;
  notes: string;
  customerId?: Types.ObjectId;
  isBillable: boolean;
  projectId?: Types.ObjectId;
  markUpBy: number;
  fileInfos: {
    fileName: string;
    filePath: string;
  }[];
  pdf_url?: string;
}

const vendorExpenseSchema = new Schema<IVendorExpense>({
  expenseDate: Date,
  expenseAccount: String,
  expenseAmount: Number,
  paymentThrough: String,
  vendorId: { type: Schema.Types.ObjectId, ref:"Vendor" },
  invoiceId: String,
  notes: String,
  customerId: { type: Schema.Types.ObjectId, ref:"Customer" },
  isBillable: Boolean,
  projectId: { type: Schema.Types.ObjectId, ref:"Project" },
  markUpBy: Number,
  fileInfos: [{
    fileName: String,
    filePath: String,
  }],
  pdf_url: String,
});

export { IVendorExpense, vendorExpenseSchema }