import { Document, Schema, Types } from "mongoose";

interface IRecurringExpense extends Document {
  profileName: string;
  repeatEvery: string;
  expenseStartDate: Date;
  expenseEndDate: Date;
  neverExpire: boolean;
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
  status: string;
}

const recurringExpenseSchema = new Schema<IRecurringExpense>({
  profileName: String,
  repeatEvery: String,
  expenseStartDate: Date,
  expenseEndDate: Date,
  neverExpire: Boolean,
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
  status: String,
});

export { IRecurringExpense, recurringExpenseSchema }