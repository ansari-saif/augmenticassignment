import { Document, Schema, Types } from "mongoose";
import { CreditNote, Customer } from "../../models";

interface ICreditNote extends Document {
  id: number;
  customer: Types.ObjectId;
  amount: number;
  associatedInvoice: number;
  createdBy: number;
}

const creditNoteSchema = new Schema<ICreditNote>(
  {
    _id: Number,
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    amount: Number,
    associatedInvoice: {
      type: Number,
      ref: "SaleInvoice",
    },
    createdBy: {
      type: Number,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

creditNoteSchema.pre("save", function (next) {
  if (this.isNew) {
    CreditNote.countDocuments({}, async (err: any, count: any) => {
      if (err) {
        return next(err);
      }
      this.id = count + 1;
      Customer.findByIdAndUpdate(this.customer, {
        $push: {
          creditNotes: this.id,
        },
      })
        .then(() => {
          next();
        })
        .catch(next);
    });
  } else next();
});

export { ICreditNote, creditNoteSchema };
