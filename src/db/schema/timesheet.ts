import { Document, Schema } from "mongoose";

interface ISession {
  id: Number;
  from: Date;
  upto: Date;
}

interface ITimesheet extends Document {
  employee: Number;
  date: Date;
  hours: number;
  description: string;
  sessions: ISession[];
}

const timesheetSchema = new Schema<ITimesheet>(
  {
    employee: { type: Number, required: true },
    date: Date,
    hours: Number,
    description: String,
    sessions: [{ id: Number, from: Date, upto: Date }],
  },
  {
    timestamps: true,
  }
);

export { ITimesheet, timesheetSchema };
