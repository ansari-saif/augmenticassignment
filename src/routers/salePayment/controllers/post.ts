// create an express post route for the salePayment model

import { Request, Response } from "express";
import { Customer, SaleInvoice } from "../../../models";
import { SalePayment } from "../../../models/salePayment";
import { validatePayment } from "../../../validators";

export default async function controllerPost(req: Request, res: Response) {
  const data = req.body;
  const errors = validatePayment(data.payment);
  console.log(data.payment)
  if (errors.length) {
    res.status(400).json({ errors });
    return;
  }
  const salePayment = new SalePayment(data.payment);
  salePayment.save(async (err, salePayment) => {
    if (err) {
      res.status(500).json(err);
    } else {
      for await (const invoice of data.invoices) {
        const id = invoice._id;
        const newInvoice = await SaleInvoice.findByIdAndUpdate(id, invoice);
        if(!newInvoice) {
          return res.status(404).json({message: "Invoice not found"});
        }
        const newId = newInvoice._id;
        console
        console.log(newInvoice)
        // data.payment = {
        //   ...payment,
        //   invoices
        // }
      }
      const newCustomer = await Customer.findByIdAndUpdate(data.payment.customer.id, data.updatedCustomer);
      if(!newCustomer) {
        return res.status(404).json({message: "Customer not found"});
      }    
      res.status(201).json(salePayment);
    }
  });
}
