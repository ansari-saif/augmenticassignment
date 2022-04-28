import { Document, Schema, Types } from "mongoose";

interface IVendorBill extends Document {
  vendorId : Types.ObjectId;
  billNo: string;
  orderNo: string;
  billDate: Date;
  dueDate: Date;
  paymentTerms: string;
  discountType: string;
  transaction: {
    itemDetails: string;
    account: string;
    quantity: number;
    rate: number;
    discount: {discountType: string; discountValue: number;};
    customerDetails: Types.ObjectId;
    amount: number;
  };
  subTotal: number;
  discount: {
    discountType: string;
    discountValue: number;
  };
  discountAccount: string;
  discountAmount: number;
  taxSystem: string;
  taxType: string;
  taxAmount: number;
  adjustment: {
    adjustmentName: string;
    adjustmentValue: number;
  };
  total: number;
  balanceDue: number;
  status: string;
  notes: string;
}


const vendorBillSchema = new Schema<IVendorBill>(
  {
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
    billNo: String,
    orderNo: String,
    billDate: Date,
    dueDate: Date,
    paymentTerms: String,
    discountType: String,
    transaction: {
      itemDetails: String,
      account: String,
      quantity: Number,
      rate: Number,
      discount: {discountType: String, discountValue: Number,},
      customerDetails: { type: Schema.Types.ObjectId, ref: "Vendor" },
      amount: Number,
    },
    subTotal: Number,
    discount: {
      discountType: String,
      discountValue: Number,
    },
    discountAccount: String,
    discountAmount: Number,
    taxSystem: String,
    taxType: String,
    taxAmount: Number,
    adjustment: {
      adjustmentName: String,
      adjustmentValue: Number,
    },
    total: Number,
    balanceDue: Number,
    status: String,
    notes: String,
  }
);

// vendorBillSchema.post("updateOne", function(next){
//   if(this.balanceDue <= 0){
//     this.status = "PAID";
//   }
//   console.log(this);
//   next();
// })

export { IVendorBill, vendorBillSchema }