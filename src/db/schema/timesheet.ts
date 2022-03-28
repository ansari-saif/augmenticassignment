import { Document, Schema, Types } from "mongoose";

interface ITimesheet extends Document {
  employee: Types.ObjectId;
  date: Date;
  hours: number;
  description: string;
}

const timesheetSchema = new Schema<ITimesheet>(
  {
    employee: { type: Schema.Types.ObjectId, ref: "Employee" },
    date: Date,
    hours: Number,
    description: String,
  },
  {
    timestamps: true,
  }
);

export { ITimesheet, timesheetSchema };
