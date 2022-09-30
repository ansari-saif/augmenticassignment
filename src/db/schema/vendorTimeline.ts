import { Document, Schema, Types } from "mongoose";

interface IVendorTimeline {
  vendor: Types.ObjectId; 
  timelineType: string;
  // dateTime: Date;
  description: string;
  link: string;
}

const vendorTimelineSchema = new Schema<IVendorTimeline>({
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
    timelineType: String,
    // dateTime: Date,
    description: String,
    link: String,
  },
  { timestamps: true }
);

export { IVendorTimeline, vendorTimelineSchema };