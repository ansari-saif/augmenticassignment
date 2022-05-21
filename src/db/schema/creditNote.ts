import { Document, Schema, Types } from "mongoose";
import { CreditNote, Customer } from "../../models";

interface Item {
  item: string;
  description: string;
  unitCost: string;
  quantity: string;
  amount: number;
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface ICreditNote extends Document {
  customer: Customer;
  creditDate: Date;
  creditNote: string;
  customerNotes: string;
  discount: string; 
  grandTotal: number;
  items: Item[];
  amount: number;
  reference: string;
  subject: string;
  tax: Types.ObjectId;
  termsAndConditions: string;
  associatedInvoice: number;
  employee: number;
}

const creditNoteSchema = new Schema<ICreditNote>(
  {
    customer: 
      {
        id: { type: String, ref: "Customer" },
        name: String,
        email: String,
      }
    ,
    creditDate: Date,
    creditNote: String,
    customerNotes: String,
    discount: String,
    grandTotal: Number,
    amount: Number,
    items: [
      {
        item: String,
        description: String,
        unitCost: String,
        quantity: String,
        amount: Number,
      },
    ],
    reference: String,
    subject: String,
    tax: { type: Schema.Types.ObjectId, ref: "Tax" },
    termsAndConditions: String,
    associatedInvoice: {
      type: Number,
      ref: "SaleInvoice",
    },
    employee: {
      type: Number,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  }
);

// creditNoteSchema.pre("save", function (next) {
//   if (this.isNew) {
//     CreditNote.countDocuments({}, async (err: any, count: any) => {
//       if (err) {
//         return next(err);
//       }
//       this.id = count + 1;
//       Customer.findByIdAndUpdate(this.customer, {
//         $push: {
//           creditNotes: this.id,
//         },
//       })
//         .then(() => {
//           next();
//         })
//         .catch(next);
//     });
//   } else next();
// });

export { ICreditNote, creditNoteSchema };
