import { Document, Schema, Types } from "mongoose";
import { VendorBill } from "../../models/VendorBill";

interface IVendorBillPayment extends Document {
  vendorId : Types.ObjectId;
  paymentNo: number;
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
  fileInfos: {
    fileName: string;
    filePath: string;
  }[];
  pdf_url?:string;
}

const vendorBillPaymentSchema = new Schema<IVendorBillPayment>({
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
  paymentNo: Number,
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
  fileInfos: [{
    fileName: String,
    filePath: String,
  }],
  pdf_url : String,
});

vendorBillPaymentSchema.pre("save", async function(next){
  try {
    
    if(this.vendorBill){
      this.vendorBill.forEach(async (vb) => {
        if(vb.billPaymentAmount != 0){
          if(vb.balanceDue <= 0){
            await VendorBill.findByIdAndUpdate(vb._id, { balanceDue: vb.balanceDue, status: "PAID" }, { new: true });
          } else{
            await VendorBill.findByIdAndUpdate(vb._id, { balanceDue: vb.balanceDue }, { new: true });
          }
        }
      })
    }
    next();
  } catch (err) {
    console.log(err);
  }
});

export { IVendorBillPayment, vendorBillPaymentSchema }