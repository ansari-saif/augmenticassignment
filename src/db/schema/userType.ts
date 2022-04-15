import { Document, Schema, Types } from "mongoose";


interface IUserType extends Document {
  customer: Types.ObjectId[];
  vendor: Types.ObjectId[];
  employee: Types.ObjectId[];
  // agent: Types.ObjectId[];
}

const userTypeSchema = new Schema<IUserType>(
  {
    customer: [
      {
        type: Schema.Types.ObjectId,
        ref: "Customer",
      },
    ],
    vendor: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vendor",
      },
    ],
    employee: [
      {
        type: Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
  }
);

// userTypeSchema.virtual('customers', {
//   ref: 'Customers',
//   localField: '_id',
//   foreignField: 'usertypes',
//   justOne: false
// });

export { IUserType, userTypeSchema };