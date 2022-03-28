// validate sale payment

import { ISalePayment } from "../db/schema/salePayment";

const validatePayment = (payment: ISalePayment) => {
  if (!payment) return [{ message: "No data was provided" }];
  const errors: Array<{ message: string }> = [];
  if (!payment.invoice) errors.push({ message: "Invoice is required" });
  if (!payment.paymentDate)
    errors.push({ message: "Payment date is required" });
  if (!payment.amount) errors.push({ message: "Amount is required" });
  if (!payment.paymentMode)
    errors.push({ message: "Payment mode is required" });
  return errors;
};

export default validatePayment;
