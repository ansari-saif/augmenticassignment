import { Document, Schema } from "mongoose";
import { Vendor } from "../../models";
import { VendorCredit } from "../../models/vendorCredit";

interface IVendorCredit extends Document {
  id: number;
  vendor: number;
  amount: number;
  createdBy: number;
}

const vendorCreditSchema = new Schema<IVendorCredit>(
  {
    _id: Number,
    vendor: Number,
    amount: Number,
    createdBy: Number,
  },
  {
    timestamps: true,
    _id: false,
  }
);

vendorCreditSchema.pre("save", function (next) {
  if (this.isNew) {
    VendorCredit.countDocuments({}, (err: any, count: any) => {
      if (err) return next(err);
      this._id = count + 1;
      Vendor.findByIdAndUpdate(this.vendor, {
        $push: {
          vendorCredits: this._id,
        },
      })
        .then(() => {
          next();
        })
        .catch(next);
    });
  }
});

export { IVendorCredit, vendorCreditSchema };
