import { Document, Schema, Types } from "mongoose";
import { SaleInvoice, Customer } from "../../models";
import { Employee } from "../../models/employee";

interface Item {
  item: string;
  description: string;
  unitCost: number;
  quantity: number;
  amount: number;
}

interface ISaleInvoice extends Document {
  id: number;
  customer: Types.ObjectId;
  project: Types.ObjectId;
  tax: number;
  invoiceDate: Date;
  expiryDate: Date;
  taxAmount: number;
  discount: number;
  tds: number;
  total: number;
  otherInformation: string;
  type: string;
  items: Item[];
  createdBy: number;
  status: string;
  paid: boolean;
}

const saleInvoiceSchema = new Schema<ISaleInvoice>(
  {
    _id: Number,
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    paid: {
      type: Boolean,
      default: false,
    },
    tax: Number,
    invoiceDate: Date,
    expiryDate: Date,
    taxAmount: Number,
    discount: Number,
    total: Number,
    tds: Number,
    otherInformation: String,
    type: String,
    createdBy: { type: Number, ref: "Employee" },
    status: {
      type: String,
      default: "Pending",
    },
    items: [
      {
        item: String,
        description: String,
        unitCost: Number,
        quantity: Number,
        amount: Number,
      },
    ],
  },
  { _id: false, timestamps: true }
);

saleInvoiceSchema.pre("save", function (next) {
  if (this.isNew) {
    SaleInvoice.findOne({})
      .sort({ _id: -1 })
      .limit(1)
      .then(async (docs) => {
        console.log(docs);
        this._id = (docs?._id || 0) + 1;
        await Customer.findByIdAndUpdate(this.customer, {
          $push: {
            invoices: this._id,
          },
        })
          .then(async () => {
            next();
          })
          .catch((err) => {
            console.log(err);
            next(err);
          });
      })
      .catch(next);
  } else next();
});

export { ISaleInvoice, saleInvoiceSchema };
