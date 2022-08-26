// create an express put route for the creditNote model

import { Request, Response } from "express";
import { updateLocale } from "moment";
import { CreditNote, SaleInvoice } from "../../../models";

export async function controllerPut(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  if (id) {
    const note = await CreditNote.findByIdAndUpdate(id, data);
    if (!note) {
      return res.status(404).json({ message: "SaleInvoice not found" });
    }
    return res.status(200).json(note);
  }
  const notes = await CreditNote.find({});
  return res.status(200).json(notes);
}

export async function applyToInvoicePut(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const creditNote : any = await CreditNote.findById(id)
    let invoicesD : any = [];
  
    let creditAmount = 0;
    for await (const credit of data) {
      if (credit.credited > 0) {
        const invoice : any = await SaleInvoice.findOne({ _id: credit.id });
        invoicesD.push(invoice);
        if (invoice.grandTotal < invoice.withholdingTax + invoice.paidAmount + invoice.credits + credit.credited) {
          return res.status(403).json({ message: "credited amount greater than invoice balance" });
        } else {
          creditAmount += credit.credited;
        }
      }
    }
    
    if (creditAmount > creditNote.grandTotal - creditNote.creditUsed) {
      return res.status(403).json({ message: "credit Applied is more than credits remaining" });
    };
    invoicesD.forEach(async (inv: any, i:number) => {
      let exists = false;
      for await (let cred of inv.creditDetails) {
        if (cred.id.toString() === id) {
          cred.credited += data[i].credited;
          inv.paidAmount += data[i].credited;
          await SaleInvoice.findByIdAndUpdate(data[i].id, inv);
          exists = true;
        }
      }

      if (!exists) {        
        inv.creditDetails.push({
          id: id,
          credited: data[i].cedited,
        });
        inv.paidAmount += data[i].credited;
        await SaleInvoice.findByIdAndUpdate(data[i].id, inv)
      }
    });
    for await (let cred of data) {
      let exists = false;
      creditNote.invoiceDetails.forEach((inv: any) => {
        if (inv.id.toString() === cred.id) {
          inv.credited += cred.credited;
          exists = true;
        }
      });
      if (!exists) {
        creditNote.invoiceDetails.push({
          id: cred.id,
          credited: cred.credited
        })
      };
    };
    creditNote.creditUsed += creditAmount;

    const updatedCreditNote = await CreditNote.findByIdAndUpdate(id, creditNote, { new: true });
    return res.status(200).send(updatedCreditNote);
  } catch (e) {
    console.log(e);
  }
}
