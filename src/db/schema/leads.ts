import { Document, Schema, Types } from "mongoose";
import { Project, Task } from "../../models";
import { Employee } from "../../models/employee";

interface ILeadActivity {
  id: number;
  type: string;
  description: string;
  dateTime: Date;
}

interface ILeadNote {
  id: number;
  title: string;
  dateTime: Date;
  description: string;
}

interface ILeadInterest {
  plot: Types.ObjectId;
  project: Types.ObjectId;
  leadType: string;
}

interface ILead extends Document {
  status: string;
  startDate: Date;
  email: string;
  createdBy: number;
  endDate: Date;
  description: string;
  project: Types.ObjectId[];
  interest: ILeadInterest[];
  name: string;
  phone: string;
  address: string;
  assignedTo: number;
  notes: ILeadNote[];
  activities: ILeadActivity[];
}

const leadSchema = new Schema<ILead>(
  {
    status: {
      type: String,
      default: "New Lead",
    },
    startDate: Date,
    email: String,
    endDate: Date,
    description: String,
    project: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    name: String,
    phone: String,
    interest: [
      {
        plot: { type: Schema.Types.ObjectId },
        project: { type: Schema.Types.ObjectId, ref: "Project" },
        leadType: { type: String, default: "New Lead" },
      },
    ],
    address: String,
    createdBy: { type: Number, ref: "Employee" },
    assignedTo: { type: Number, ref: "Employee" },
    notes: [
      {
        id: Number,
        title: String,
        dateTime: Date,
        description: String,
      },
    ],
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

leadSchema.pre("save", async function (next) {
  if (this.isNew) {
    const { project } = this;
    await Employee.findByIdAndUpdate(this.assignedTo, {
      $push: {
        activities: {
          activityType: "Lead Add",
          dateTime: new Date(),
          description: `Lead ${this.name} has been added`,
          link: `/profile/lead-profile/${this._id}`,
        },
      },
    }).catch(next);
    await Project.findOneAndUpdate(
      { _id: project, members: { $ne: this.assignedTo } },
      {
        $push: {
          members: this.assignedTo,
        },
      }
    ).catch(next);
    next();
  } else {
    next();
  }
});

export { ILead, leadSchema };
