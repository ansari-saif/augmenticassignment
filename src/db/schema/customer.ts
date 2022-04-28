import { Document, Schema, Types } from "mongoose";

interface Address {
  attention: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  fax: string;
}

interface contactPersons {
  firstName: string;
  lastName: string;
  email: string;
  workPhone: string;
  phone: string;
}

type invoiceId = Types.ObjectId 

interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  workPhone: string;
  phone: string;
  companyName: string;
  website: string;
  pan: string;
  openingBalance: number;
  paidBalance: number;
  withholdingTax: number;
  facebook: string;
  twitter: string;
  remarks: string;
  billingAddress: Address;
  shippingAddress: Address;
  contactPersons: Array<contactPersons>;
  invoices: Array<invoiceId>;
  // not sure about these
  address: string;
  creditNotes: number[];
  description: string;
}

const customerSchema = new Schema<ICustomer>(
  {
    firstName: String,
    lastName: String,
    displayName: String,
    email: String,
    workPhone: String,
    phone: String,
    companyName: String,
    website: String,
    pan: String,
    openingBalance: { type: Number, default: 0 },
    paidBalance: { type: Number, default: 0 },
    withholdingTax: { type: Number, default: 0 },
    facebook: String,
    twitter: String,
    remarks: String,
    billingAddress: {
      attention: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      zipcode: String,
      phone: String,
      fax: String,    
    },
    shippingAddress: {
      attention: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      zipcode: String,
      phone: String,
      fax: String,    
    },
    contactPersons: [
      {
        firstName: String,
        lastName: String,
        email: String,
        workPhone: String,
        phone: String,      
      },
    ],
//  not sure about these
    creditNotes: [{ type: Number, ref: "CreditNote" }],
    invoices: [
      { type: Schema.Types.ObjectId, ref: "SaleInvoice" },
    ],
    description: String,
  },
  {
    timestamps: true,
  }
);

export { ICustomer, customerSchema };
