import { Document, Schema, Types } from "mongoose";
import { PRIORITY } from "../../constants";

interface ProjectAttachment {
  name: string;
  url: string;
  uploadedAt: Date;
  uploader: number;
}

interface subPlot extends Document {
  name: string;
  leadsInfo: {
    leadType: string;
    lead: Types.ObjectId;
  }[];
  facing: string;
  area: number;
  dimension: string;
  cost: string;
  component: {
    x: string;
    y: string;
  };
  sold: boolean;
  soldAt: Date;
  soldBy: number;
  soldTo: Types.ObjectId;
}

interface IProject extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  leads: Types.ObjectId[];
  members: number[];
  vendor: Types.ObjectId;
  priority: PRIORITY;
  progress: number;
  type: string;
  createdBy: number;
  estimatedCost: number;
  costPerSqFeet: number;
  attachments: ProjectAttachment[];
  layout: string;
  subPlots: subPlot[];
}

const projectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    startDate: Date,
    endDate: Date,
    description: String,
    leads: [{ type: Schema.Types.ObjectId, ref: "Lead" }],
    members: [{ type: Number, ref: "Employee" }],
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
    priority: { type: String, enum: Object.values(PRIORITY) },
    progress: Number,
    type: String,
    costPerSqFeet: Number,
    createdBy: { type: Number, ref: "Employee" },
    layout: String,
    subPlots: [
      {
        name: String,
        leadsInfo: [
          {
            leadType: {
              default: "New Lead",
              type: String,
            },
            lead: { type: Schema.Types.ObjectId, ref: "Lead" },
          },
        ],
        facing: String,
        dimension: String,
        area: Number,
        cost: String,
        component: {
          x: String,
          y: String,
        },
        sold: {
          type: Boolean,
          default: false,
        },
        soldAt: Date,
        soldBy: { type: Number, ref: "Employee" },
        soldTo: { type: Schema.Types.ObjectId, ref: "Customer" },
      },
    ],
    estimatedCost: Number,
    attachments: [
      {
        name: String,
        url: String,
        uploadedAt: Date,
        uploader: { type: Number, ref: "Employee" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export { IProject, projectSchema };
