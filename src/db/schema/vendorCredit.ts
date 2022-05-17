import { Document, Schema, Types } from "mongoose";
import { Vendor } from "../../models";
import { VendorCredit } from "../../models/vendorCredit";

interface IVendorCredit extends Document {
  vendorId: Types.ObjectId;
  creditOrder: string;
  orderNo: string;
  vendorCreditDate: Date;
  transaction: {
    itemDetails: string;
    account: string;
    quantity: number;
    rate: number;
    discount: {discountType: string; discountValue: number;};
    amount: number;
  }[];
  subTotal: number;
  discount: {
    discountType: string;
    discountValue: number;
  };
  discountAccount: string;
  discountAmount: number;
  adjustment: {
    adjustmentName: string;
    adjustmentValue: number;
  };
  total: number;
  balance: number;
  notes: string;
  status: string;
  fileInfos: {
    fileName: string;
    filePath: string;
  }[];
  pdf_url?:string;
}

const vendorCreditSchema = new Schema<IVendorCredit>(
  {
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
    creditOrder: String,
    orderNo: String,
    vendorCreditDate: Date,
    transaction: [{
      itemDetails: String,
      account: String,
      quantity: Number,
      rate: Number,
      amount: Number,
    }],
    subTotal: Number,
    discount: {
      discountType: String,
      discountValue: Number,
    },
    discountAccount: String,
    discountAmount: Number,
    adjustment: {
      adjustmentName: String,
      adjustmentValue: Number,
    },
    total: Number,
    balance: Number,
    notes: String,
    status: String,
    fileInfos: [{
      fileName: String,
      filePath: String,
    }],
    pdf_url: String,
  }
);

// vendorCreditSchema.pre("save", function (next) {
//   if (this.isNew) {
//     VendorCredit.countDocuments({}, (err: any, count: any) => {
//       if (err) return next(err);
//       this._id = count + 1;
//       Vendor.findByIdAndUpdate(this.vendor, {
//         $push: {
//           vendorCredits: this._id,
//         },
//       })
//         .then(() => {
//           next();
//         })
//         .catch(next);
//     });
//   }
// });

export { IVendorCredit, vendorCreditSchema };
