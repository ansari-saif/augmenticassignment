import moment from "moment";
import { RecurringExpense } from "../models/recurringExpense"
import { VendorExpense } from "../models/vendorExpense";
import { calculateNextTime } from "../utils/nextTime";


module.exports = async () => {
  
  let today = moment().format("YYYY-MM-DD")

  const recurringExpense = await RecurringExpense.find();

  const activeExpense = recurringExpense.filter(exp => exp.status == "Active");

  const neverExpireExpense = activeExpense.filter(exp => exp.neverExpire == true);

  const mayExpireExpense = activeExpense.filter(exp => exp.neverExpire != true);

  neverExpireExpense.forEach(async (nep) => {
    const expNextDay = moment(nep.expenseNextDate).format("YYYY-MM-DD");
    const vendorExpense = {
      expenseDate: today,
      expenseAccount : nep?.expenseAccount,
      expenseAmount: nep?.expenseAmount,
      paymentThrough: nep?.paymentThrough,
      vendorId: nep?.vendorId,
      notes: nep?.notes,
      customerId: nep?.customerId,
      isBillable: nep?.isBillable,
      projectId: nep?.projectId,
      markUpBy: nep?.markUpBy,
      status: nep?.isBillable ? "UNBILLED" : "NON-BILLABLE"
    }

    if(expNextDay == today){
      const aa = await VendorExpense.create(vendorExpense);
      // console.log({aa})
      const updateExpnxtD = calculateNextTime(nep?.expenseNextDate, nep?.repeatEvery.repeatNumber, nep?.repeatEvery.repeatUnit);
      const bb = await RecurringExpense.findByIdAndUpdate(nep?._id, { expenseNextDate : updateExpnxtD });
      // console.log({bb})
    }
  })

  mayExpireExpense.forEach(async (mep) => {
    const expNextDay = moment(mep.expenseNextDate).format("YYYY-MM-DD");
    const expEndtDay = moment(mep.expenseEndDate).format("YYYY-MM-DD");
    const vendorExpense = {
      expenseDate: today,
      expenseAccount : mep?.expenseAccount,
      expenseAmount: mep?.expenseAmount,
      paymentThrough: mep?.paymentThrough,
      vendorId: mep?.vendorId,
      notes: mep?.notes,
      customerId: mep?.customerId,
      isBillable: mep?.isBillable,
      projectId: mep?.projectId,
      markUpBy: mep?.markUpBy,
      status: mep?.isBillable ? "UNBILLED" : "NON-BILLABLE"
    }

    const sameOrAfter = moment(expEndtDay).isSameOrAfter(today, "day");

    if(sameOrAfter){
      if(expNextDay == today){
        const cc = await VendorExpense.create(vendorExpense);
        // console.log({cc})
        const updateExpnxtD = calculateNextTime(mep?.expenseNextDate, mep?.repeatEvery.repeatNumber, mep?.repeatEvery.repeatUnit);
        // console.log({updateExpnxtD});
        const updatedSameOrAfter = moment(expEndtDay).isSameOrAfter(updateExpnxtD, "day");
        if(updatedSameOrAfter){
          const dd = await RecurringExpense.findByIdAndUpdate(mep?._id, { expenseNextDate : updateExpnxtD });
          // console.log({dd})
        } else {
          const ee =await RecurringExpense.findByIdAndUpdate(mep?._id, { expenseNextDate : undefined, status: "INACTIVE" });
          // console.log({ee})
        }
      }
    }

  });

} 