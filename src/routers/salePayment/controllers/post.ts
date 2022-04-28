// create an express post route for the salePayment model

import { Request, Response } from "express";
import { Customer, SaleInvoice } from "../../../models";
import { SalePayment } from "../../../models/salePayment";
import { validatePayment } from "../../../validators";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validatePayment(data.payment);
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  const invoices =[...data.changedInv];
  let invoice = []
  for await (const inv of invoices) {
    const newInvoice: any = await SaleInvoice.findById(inv._id);
    if (!inv) {
      return res.status(404).json({message: "Invoice not found"});
    }
    const paidAmount = inv.paidAmount - newInvoice.paidAmount;
    const withholdingTax = inv.withholdingTax - newInvoice.withholdingTax;
    invoice.push({
      id: inv._id,
      paidAmount,
      withholdingTax,
    })
  }
  data.payment.invoice = invoice;
  const salePayment = new SalePayment(data.payment);
  salePayment.save(async (err, salePayment) => {
    if (err) {
      res.status(500).json(err);
    } else {
      for await (const invoice of data.changedInv ) {
        const newInvoice = await SaleInvoice.findByIdAndUpdate(invoice._id, invoice);
        if (!newInvoice) {
          return res.status(404).json({message: "Invoice not found"});
        }
      }
      if (data.customerModified.isModified) {
        const newCustomer = await Customer.findByIdAndUpdate(data.payment.customer.id, data.updatedCustomer);
        if(!newCustomer) {
          return res.status(404).json({message: "Customer not found"});
        }
      }
      res.status(201).json(salePayment);
    }
  });
}
