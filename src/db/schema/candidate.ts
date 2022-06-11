import { Document, Schema } from "mongoose";

interface ICandidate extends Document {
  name: string;
  firstName: string;
  lastName: string;
  job: Schema.Types.ObjectId;
  message: string;
  resume: string;
  mobile: string;
  email: string;
  status: string;
  onBoarding: boolean;
  fileInfos?:{
    fileName: string;
    filePath: string;
  };
}

const candidateSchema = new Schema<ICandidate>(
  {
    name: {
      type: String,
      required: true,
    },
    firstName: String,
    lastName: String,
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
    message: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    onBoarding : {
      type: Boolean,
    },
    fileInfos : {
      fileName: String,
      filePath: String,
    },
  },
  {
    timestamps: true,
  }
);


export { candidateSchema, ICandidate };
