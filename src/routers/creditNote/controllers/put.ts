// create an express put route for the creditNote model

import { Request, Response } from "express";
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
        if (invoice.grandTotal < invoice.withholdingTax + invoice.paidAmount + credit.credited) {
          return res.status(403).json({ message: "credited amount greater than invoice balance" });
        } else {
          creditAmount += credit.credited;
        }
      }
    }
    
    if (creditAmount > creditNote.grandTotal - creditNote.creditUsed) {
      return res.status(403).json({ message: "credit Applied is more than credits remaining" });
    }
    
    let invoiceDetails : any = creditNote.invoiceDetails;
    let invoices : any = creditNote.invoices;
    let i = 0;
    for await (const credit of data) {
      if (credit.credited > 0) {
        let noInv = true;
        if (invoices) {
          invoices.includes(id) ? null : invoices.push(id);
        } else {
          invoices = [];
          invoices.push(id);
        };
  
        if (invoiceDetails.length > 0) {
          invoiceDetails.forEach((cred: any) => {
            if (cred.id === credit.id) {
              cred.credited += credit.credited;
              noInv = false;
            }
          });
        } else {
          invoiceDetails = [];
          invoiceDetails.push(credit);
        }
        
        let creditNotes = (invoicesD[i].creditNotes);
        let creditDetails = invoicesD[i].creditDetails;
        let paidAmount = invoicesD[i].paidAmount;
        if (creditNotes) {
          creditNotes.includes(id) ? null : creditNotes.push(id);
        } else {
          creditNotes = [];
          creditNotes.push(id);
        }
  
        let noCred = false;
        if (creditDetails.length > 0) {
          creditDetails.forEach((cred : any, i : number) => {
            if (cred.id.toString() === id) {
              cred.credited += credit.credited;
              paidAmount += credit.credited;
              noCred = true;
            } 
          })
        } else {
          creditDetails = [];
          creditDetails.push({
            id: id,
            credited: credit.credited,
          })
          paidAmount += credit.credited;
        }
        invoicesD[i].creditNotes = creditNotes;
        invoicesD[i].creditDetails = creditDetails;
        invoicesD[i].paidAmount = paidAmount;
        await SaleInvoice.findByIdAndUpdate(invoicesD[i]._id, invoicesD[i]);
        i += 1;
      }
    }
    creditNote.invoices = invoices;
    creditNote.invoiceDetails = invoiceDetails;
    creditNote.creditUsed = creditNote.creditUsed + creditAmount;
    await CreditNote.findByIdAndUpdate(creditNote._id, creditNote);
    res.status(200).json({ message: 'Credit updated'});
  } catch (e) {
    console.log(e);
  }
}
