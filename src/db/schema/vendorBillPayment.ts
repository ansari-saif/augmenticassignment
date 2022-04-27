import { Document, Schema, Types } from "mongoose";

interface IVendorBillPayment extends Document {
  vendorId : Types.ObjectId;
  paymentMade: number;
  paymentDate: Date;
  paymentMode: string;
  paymentThrough: string;
  referenceId: string;
  vendorBill: {
    _id: Types.ObjectId;
    billNo: string;
    dueDate: Date; 
    billDate: Date;
    total: number;
    balanceDue: number;
    billPaymentDate: Date;
    billPaymentAmount: number;
    purchaseOrder: string;
  }[];
  amountPaid: number;
  totalPaymentAmount: number;
  amountRefunded: number;
  amountExcess: number;
  notes: string;
}

const vendorBillPaymentSchema = new Schema<IVendorBillPayment>({
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
  paymentMade: Number,
  paymentDate: Date,
  paymentMode: String,
  paymentThrough: String,
  referenceId: String,
  vendorBill: [{
    _id: { type: Schema.Types.ObjectId, ref: "VendorBill" },
    billNo: String,
    dueDate: Date, 
    billDate: Date,
    total: Number,
    balanceDue: Number,
    billPaymentDate: Date,
    billPaymentAmount: Number,
    purchaseOrder: String,
  }],
  amountPaid: Number,
  totalPaymentAmount: Number,
  amountRefunded: Number,
  amountExcess: Number,
  notes: String,
});

export { IVendorBillPayment, vendorBillPaymentSchema }