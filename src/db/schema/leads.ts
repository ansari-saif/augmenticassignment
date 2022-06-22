import { Document, Schema, Types } from "mongoose";
import { Project, Task } from "../../models";
import { Employee } from "../../models/employee";

interface ILeadActivity {
  id: number;
  type: string;
  description: string;
  dateTime: Date;
}

// interface ILeadNote {
//   id: number;
//   title: string;
//   dateTime: Date;
//   description: string;
// }

interface IAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ILead extends Document {
  firstName: string;
  lastName: string;
  status: Types.ObjectId;
  startDate: Date;
  email: string;
  nextAppointment: Date;
  createdBy: number;
  endDate: Date;
  project: Types.ObjectId;
  lead: string;
  phone: string;
  address: IAddress;
  assignedTo: [number];
  pointDiscussed: string;
  totalCalls: string;
  assignType: string;
  currentAssigned: number;
  activities: ILeadActivity[];
  interest: [string]; //added this to remove error from.
  // not used
}

const leadSchema = new Schema<ILead>(
  {
    status: { type: Schema.Types.ObjectId, ref: 'LeadStatus' },
    firstName: String,
    lastName: String,
    startDate: Date,
    nextAppointment: Date,
    email: String,
    endDate: Date,
    project: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    lead: String,
    phone: String,
    address: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      zipCode: String,
    },
    assignType: String,
    createdBy: { type: Number, ref: "Employee" },
    assignedTo: [{ type: Number, ref: "Employee" }],
    currentAssigned: { type: Number, ref: "Employee" },
    totalCalls: String,
    pointDiscussed: String,
    activities: [
      {
        id: Number,
        activityType: String,
        description: String,
        dateTime: Date,
      },
    ],
  },
  { timestamps: true }
);

export { ILead, leadSchema };
