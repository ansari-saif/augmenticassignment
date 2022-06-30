import { Document, Schema, Types } from "mongoose";
import { Project } from "../../models";

interface ILandSale extends Document {
  landOwnerName : string;
  payDate: Date;
  totalAmount : number;
  advanceAmount: number;
  balanceAmount : number;
  modeOfPay: string;
  receivedBy : string;
  khataNo: number;
  plotNo: number;
  chakaNo: number;
  area: number;
  typeOfDoc: string;
  documentNo: string;
  purchaserName: string;
  vendorId : Types.ObjectId;
  projectId : Types.ObjectId;
  mouza: string;
  typesofkisam : string;
  dateOfMutation: string;
  dateOfConversion: string;
  remarks: string;
}

const landSaleSchema = new Schema<ILandSale>(
  {
    landOwnerName : String,
    payDate: Date,
    totalAmount : Number,
    advanceAmount: Number,
    balanceAmount : Number,
    modeOfPay: String,
    receivedBy : String,
    khataNo: Number,
    plotNo: Number,
    chakaNo: Number,
    area: Number,
    typeOfDoc: String,
    documentNo: String,
    purchaserName: String,
    vendorId : { type: Schema.Types.ObjectId, ref: "Vendor" },
    projectId : { type: Schema.Types.ObjectId, ref: "Project" },
    mouza: String,
    typesofkisam : String,
    dateOfMutation: String,
    dateOfConversion: String,
    remarks: String,
  }
)

landSaleSchema.pre("save", async function(next){
  const projectData = await Project.findById(this?.projectId);
  const landArea =  this?.area + ( projectData?.landArea || 0);
  await Project.findByIdAndUpdate(this?.projectId, { landArea : Number(landArea) });
  next();
})

export { ILandSale, landSaleSchema };