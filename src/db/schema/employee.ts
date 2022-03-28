import { Document, Schema, Types } from "mongoose";
import { GENDER, USER_AUTHORITIES, USER_TYPE } from "../../constants";
import { Employee } from "../../models/employee";

interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PreviousExperience {
  startDate: Date;
  endDate: Date;
  company: string;
  designation: string;
  responsibilities: string;
}

interface Education {
  qualification: string;
  instution: string;
  startDate: Date;
  endDate: Date;
  university: string;
  specialization: string;
  score: Number;
  gradingSystem: string;
}

interface otherContacts {
  name: String;
  relationship: String;
  phone: String;
}

interface BankDetails {
  accountHoldersName: String;
  accountNumber: String;
  IFSC: String;
  upi: String;
  pan: String;
  aadhar: String;
}

interface EmployeeActivity {
  activityType: string;
  dateTime: Date;
  description: string;
  link: string;
}

interface PersonalInformation {
  passportNo: String;
  passportExp: Date;
  phoneNo: String;
  nationality: String;
  religion: String;
  maritalStatus: String;
  employmentOfSpouse: String;
  numberOfChildren: Number;
}

interface IEmployee extends Document {
  id: Number;
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: GENDER;
  address: Address;
  mobileNo: string;
  dob: Date;
  previousExperience: PreviousExperience[];
  education: Education[];
  userAuthorites: USER_AUTHORITIES[];
  managerUserId: Number;
  active: Boolean;
  joinDate: Date;
  workLocation: Types.ObjectId;
  jobRole: Types.ObjectId;
  activities: EmployeeActivity[];
  userType: USER_TYPE;
  acceptedTimesheets: Types.ObjectId[];
  salary: Number;
  personalInformation: PersonalInformation;
  emergencyContact: otherContacts;
  familyInformation: otherContacts;
  bankDetails: BankDetails;
}

const employeeSchema = new Schema<IEmployee>(
  {
    _id: Number,
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    email: {
      type: String,
      unique: true,
    },
    firstName: String,
    lastName: String,
    gender: {
      type: String,
      enum: Object.values(GENDER),
    },
    userType: {
      type: String,
      enum: Object.values(USER_TYPE),
    },
    acceptedTimesheets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Timesheet",
      },
    ],
    address: {
      type: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
      },
    },
    personalInformation: {
      passportNo: String,
      passportExp: Date,
      phoneNo: String,
      nationality: String,
      religion: String,
      maritalStatus: String,
      employmentOfSpouse: String,
      numberOfChildren: Number,
    },
    mobileNo: String,
    dob: Date,
    previousExperience: [
      {
        startDate: Date,
        endDate: Date,
        company: String,
        designation: String,
        responsibilities: String,
      },
    ],
    education: [
      {
        qualification: String,
        instution: String,
        startDate: Date,
        endDate: Date,
        university: String,
        specialization: String,
        score: Number,
        gradingSystem: String,
      },
    ],
    emergencyContact: [
      {
        name: String,
        relationship: String,
        phone: String,
      },
    ],
    userAuthorites: [
      {
        type: String,
        enum: Object.values(USER_AUTHORITIES),
      },
    ],
    managerUserId: Number,
    active: Boolean,
    joinDate: Date,
    workLocation: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
    jobRole: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    activities: [
      {
        activityType: String,
        dateTime: Date,
        description: String,
        link: String,
      },
    ],
    bankDetails: {
      accountHoldersName: String,
      accountNumber: String,
      IFSC: String,
      upi: String,
      pan: String,
      aadhar: String,
    },
    salary: Number,
    familyInformation: [
      {
        name: String,
        relationship: String,
        phone: String,
      },
    ],
  },
  { _id: false, timestamps: true }
);

employeeSchema.pre("save", function (next) {
  if (this.isNew) {
    Employee.countDocuments({}, (err: any, count: any) => {
      if (err) return next(err);
      this._id = count + 1;
      next();
    });
  } else next();
});

export { IEmployee, employeeSchema };
