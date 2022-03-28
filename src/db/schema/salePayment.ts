import { Document, Schema, Types } from "mongoose";
import { SaleInvoice } from "../../models";

interface ISalePayment extends Document {
  invoice: number;
  customer: Types.ObjectId;
  paymentDate: Date;
  amount: number;
  paymentMode: string;
  createdBy: number;
}

const salePaymentSchema = new Schema<ISalePayment>(
  {
    invoice: { type: Number, ref: "SaleInvoice" },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    paymentDate: Date,
    amount: Number,
    paymentMode: String,
    createdBy: { type: Number, ref: "Employee" },
  },
  {
    timestamps: true,
  }
);

salePaymentSchema.pre("save", function (next) {
  if (this.isNew) {
    this.paymentDate = new Date();
    SaleInvoice.findOneAndUpdate(
      {
        _id: this.invoice,
      },
      {
        status: "Paid",
      }
    )
      .then(() => {
        next();
      })
      .catch(next);
  } else next();
});

export { ISalePayment, salePaymentSchema };
