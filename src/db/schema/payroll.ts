
import { Document, Types, Schema } from "mongoose";

interface IPayroll extends Document {
  employeeId : number;
  fromDate: Date;
  toDate: Date;
  salaryRate: {
    basicSalary: number;
    DA: number;
    HRA: number;
    totalSalary: number;
  };
  attendance: {
    present: number;
    paidLeave: number;
    weeklyOff: number;
    festival: number;
    paidDays: number;
  };
  earnedSalary: {
    eBasicSalary: number;
    eDA: number;
    eHRA: number;
    incentive: number;
    totalEarned: number;
  };
  deduction: {
    esiAmount: number;
    PF: number;
    advanceAmt: number;
    TDS: number;
    LWF: number;
    professionalTax: number;
    totalDeduction: number;
  };
  netSalary: number;
  description: string;
};

const payrollSchema = new Schema<IPayroll>({
  employeeId : {
    type: Number, ref: "Employee"
  },
  fromDate: Date,
  toDate: Date,
  salaryRate: {
    basicSalary: Number,
    DA: Number,
    HRA: Number,
    totalSalary: Number,
  },
  attendance: {
    present: Number,
    paidLeave: Number,
    weeklyOff: Number,
    festival: Number,
    paidDays: Number,
  },
  earnedSalary: {
    eBasicSalary: Number,
    eDA: Number,
    eHRA: Number,
    incentive: Number,
    totalEarned: Number,
  },
  deduction: {
    esiAmount: Number,
    PF: Number,
    advanceAmt: Number,
    TDS: Number,
    LWF: Number,
    professionalTax: Number,
    totalDeduction: Number,
  },
  netSalary: Number,
  description: String,
}, 
{
  timestamps: true
});

export { IPayroll, payrollSchema };