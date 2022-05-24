import moment from "moment";
import { RecurringBill } from "../models/recurringBill";
import { VendorBill } from "../models/VendorBill";
import { calculateNextTime } from "../utils/nextTime";

module.exports = async () => {
  let today = moment().format("YYYY-MM-DD");

  const recurringBill = await RecurringBill.find();

  const activeBill = recurringBill.filter(bill => bill.status == "Active");

  const neverExpireBill = activeBill.filter(bill => bill.neverExpire == true);

  const mayExpireBill = activeBill.filter(bill => bill.neverExpire != true);

  neverExpireBill.forEach(async (neb) => {
    const expNextDay = moment(neb?.billNextDate).format("YYYY-MM-DD");
    const vendorBill = {
      vendorId : neb?.vendorId,
      billNo: `BTX${Math.ceil(new Date().getTime() * Math.random() * 1000)}`,
      billDate : neb?.billStartDate,
      paymentTerms : neb?.paymentTerms,
      discountType : neb?.discountType,
      transaction : neb?.transaction,
      subTotal: neb?.subTotal,
      discount: neb?.discount,
      discountAccount: neb?.discountAccount,
      discountAmount : neb?.discountAmount,
      taxSystem : neb?.taxSystem,
      taxType : neb?.taxType,
      taxAmount: neb?.taxAmount,
      adjustment: neb?.adjustment,
      total : neb?.total,
      balanceDue: neb?.total,
      status: "OPEN",
      notes: neb?.notes
    }

    if(expNextDay == today){
      const aa = await VendorBill.create(vendorBill);
      // console.log({aa})
      const updateExpnxtD = calculateNextTime(neb?.billNextDate, neb?.repeatEvery.repeatNumber, neb?.repeatEvery.repeatUnit);
      const bb = await RecurringBill.findByIdAndUpdate(neb?._id, { billNextDate : updateExpnxtD });
      // console.log({bb})
    }
  })

  mayExpireBill.forEach(async (meb) => {
    const billNextDay = moment(meb?.billNextDate).format("YYYY-MM-DD");
    const billEndtDay = moment(meb?.billEndDate).format("YYYY-MM-DD");
    const vendorBill = {
      vendorId : meb?.vendorId,
      billNo: `BTX${Math.ceil(new Date().getTime() * Math.random() * 1000)}`,
      billDate : meb?.billStartDate,
      paymentTerms : meb?.paymentTerms,
      discountType : meb?.discountType,
      transaction : meb?.transaction,
      subTotal: meb?.subTotal,
      discount: meb?.discount,
      discountAccount: meb?.discountAccount,
      discountAmount : meb?.discountAmount,
      taxSystem : meb?.taxSystem,
      taxType : meb?.taxType,
      taxAmount: meb?.taxAmount,
      adjustment: meb?.adjustment,
      total : meb?.total,
      balanceDue: meb?.total,
      status: "OPEN",
      notes: meb?.notes
    }

    const sameOrAfter = moment(billEndtDay).isSameOrAfter(today, "day");

    if(sameOrAfter){
      if(billNextDay == today){
        const cc = await VendorBill.create(vendorBill);
        // console.log({cc})
        const updateExpnxtD = calculateNextTime(meb?.billNextDate, meb?.repeatEvery.repeatNumber, meb?.repeatEvery.repeatUnit);
        // console.log({updateExpnxtD});
        const updatedSameOrAfter = moment(billEndtDay).isSameOrAfter(updateExpnxtD, "day");
        if(updatedSameOrAfter){
          const dd = await RecurringBill.findByIdAndUpdate(meb?._id, { billNextDate : updateExpnxtD });
          // console.log({dd})
        } else {
          const ee =await RecurringBill.findByIdAndUpdate(meb?._id, { billNextDate : undefined, status: "INACTIVE" });
          // console.log({ee})
        }
      }
    }

  });


}