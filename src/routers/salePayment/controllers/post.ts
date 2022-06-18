// create an express post route for the salePayment model

import { Request, Response } from "express";
import { Customer, SaleInvoice } from "../../../models";
import { SalePayment } from "../../../models/salePayment";
import { validatePayment } from "../../../validators";

export default async function controllerPost(req: Request, res: Response) {
  try {
    const data = req.body;
    const errors = validatePayment(data.payment);
    if (errors.length) {
      res.status(400).json({ errors });
      return;
    }

    const invoices = [...data.invoices];
    let invoice : any = [];

    for await (const invData of invoices) {
      const inv = await SaleInvoice.findById(invData._id);
      if (!inv) {
        return res.status(404).json({message: "Invoice not found"});
      }

      const paidAmount = invData.paidAmount - inv.paidAmount;
      const withholdingTax = invData.withholdingTax - inv.withholdingTax;

      invoice.push({
        id: inv._id.toString(),
        paidAmount,
        withholdingTax,
        invoiceNumber: inv.invoice,
        invoiceDate: inv.invoiceDate,
        invoiceAmount: inv.grandTotal,
      });

      inv.paidAmount = paidAmount;
      inv.withholdingTax = withholdingTax;
      await SaleInvoice.findByIdAndUpdate(inv._id, inv);
    }

    data.payment.invoice = invoice;
    
    const salePayment = await SalePayment.create(data.payment);

    for await (const inv of invoice ) {
      const invoiceData : any = await SaleInvoice.findById(inv.id);
      const paymentReceived = {
        id: salePayment._id,
        payment: salePayment.paymentNumber,
        paymentMode: salePayment.paymentMode,
        amount: inv.paidAmount,
      };

      invoiceData.paymentReceived.push(paymentReceived);
      const updatedInvoice = await SaleInvoice.findByIdAndUpdate(invoiceData._id, invoiceData);      
    }
    res.status(200).send({ msg: 'Payment received' });
  } catch (err) {
    res.status(500).send({ msg: 'Error Recording the Payment' })
  }
}