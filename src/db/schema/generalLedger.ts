import { Document, Schema } from "mongoose";

enum CURRENCY {
  INR = "INR",
  USD = "USD"
}

interface IGenralLedger extends Document {
  date : Date,
  journalId : number,
  referenceId : string,
  notes : string,
  journalType : string,
  currency : CURRENCY,
  transaction : {
    account : string,
    description: string,
    contact: string,
    debits: number,
    credits: number
  }[],
  total: number
}

const generalLedgerSchema = new Schema<IGenralLedger>(
  {
    date : { 
      type: Date
    },
    journalId : {
      type: Number,
      required: [true, "please add journal Id"]
    },
    referenceId: String,
    notes : String,
    journalType: String,
    currency: {
      type: String,
      default: CURRENCY.INR,
      enum: Object.values(CURRENCY)
    },
    transaction : [{
      account: String,
      description: String,
      contact: String,
      debits: Number,
      credits: Number
    }],
    total: Number
  }
);

export { IGenralLedger, generalLedgerSchema };