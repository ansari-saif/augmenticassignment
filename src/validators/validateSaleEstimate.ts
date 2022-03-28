import { ISaleEstimate } from "../db/schema/saleEstimate";

const validateSalesEstimate = (estimate: ISaleEstimate) => {
  if (!estimate) return [{ message: "No data was provided" }];
  const errors: Array<{ message: string }> = [];
  if (!estimate.lead) errors.push({ message: "Client name is required" });
  if (!estimate.clientEmail)
    errors.push({ message: "Client email is required" });
  if (!estimate.clientAddress)
    errors.push({ message: "Client address is required" });
  if (!estimate.billingAddress)
    errors.push({ message: "Billing address is required" });
  if (!estimate.estimateDate)
    errors.push({ message: "Estimate date is required" });
  if (!estimate.expiryDate) errors.push({ message: "Expiry date is required" });
  if (!estimate.tax) errors.push({ message: "Tax is required" });
  if (!estimate.discount) errors.push({ message: "Discount is required" });
  if (!estimate.total) errors.push({ message: "Total is required" });
  if (!estimate.items) errors.push({ message: "Items are required" });
  if (estimate.items.length === 0)
    errors.push({ message: "Items are required" });
  return errors;
};

export default validateSalesEstimate;
