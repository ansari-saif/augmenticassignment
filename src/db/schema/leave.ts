import { Document, Schema, Types } from "mongoose";
import { Approval } from "../../models";

interface Ileave extends Document {
  employee: Types.ObjectId;
  leaveType: Types.ObjectId;
  fromDate: Date;
  toDate: Date;
  reason: string;
  approvedBy: Types.ObjectId;
  approvedDate: Date;
  approved: boolean;
}

const leaveSchema = new Schema<Ileave>(
  {
    leaveType: { type: Schema.Types.ObjectId, ref: "LeaveType" },
    employee: { type: Schema.Types.ObjectId, ref: "Employee" },
    fromDate: Date,
    toDate: Date,
    reason: String,
    approvedBy: { type: Schema.Types.ObjectId, ref: "Employee" },
    approvedDate: Date,
    approved: Boolean,
  },
  {
    timestamps: true,
  }
);

leaveSchema.pre("save", async function (next) {
  if (this.isNew) {
    const approval = new Approval({
      type: "leave",
      leave: this._id,
    });
    approval.save((err, approval) => {
      if (err) return next(err);
      this.approved = false;
      next();
    });
  } else {
    next();
  }
});

export { Ileave, leaveSchema };
