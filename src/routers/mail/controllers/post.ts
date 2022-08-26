import { Request, Response } from "express";
import { 
  SaleEstimate, 
  SalesOrder, 
  DeliveryChallan, 
  SaleInvoice,
  CreditNote,
} from "../../../models";
import { SalePayment } from "../../../models/salePayment";
import sendMail from "../../../utils/email/nodemailer";

interface mailData {
  id: string,
  to: string[],
  body: string,
  subject: string,
  fileName: string,
  context: any,
  template: string;
  pdf_url: string;
}

export async function saleEstimate(req: Request, res: Response) {
  try {
    let data: mailData = req.body;
    if (
      data.to.length < 1
      || data.subject === ''
      || data.fileName === ''
      || data.body === '' 
    ) {
      console.log('error caught')
      return res.status(200).send({ error: 'Invalid details sent' });
    };

    const saleEstimate: any = await SaleEstimate.findById(data.id);

    data.context = {
      estimate: saleEstimate.estimate,
      estimateDate: saleEstimate.estimateDate?.toString().split('05:30:00')[0],
      amount: saleEstimate.amount,
      discount: saleEstimate.discount,
      adjustment: saleEstimate.adjustment,
      taxAmount: saleEstimate.taxAmount,
      grandTotal: saleEstimate.grandTotal
    };
    data.template = "Sale_Estimate";
    data.pdf_url = saleEstimate.pdf_url;

    const info = await sendMail(data);
    return res.status(200).send(data);
    
  } catch (e) {
    console.log(e)
    return res.status(200);
  }
}

export async function saleOrder(req: Request, res: Response) {
  try {
    let data: mailData = req.body;
    if (
      data.to.length < 1
      || data.subject === ''
      || data.fileName === ''
      || data.body === '' 
    ) {
      console.log('error caught')
      return res.status(200).send({ error: 'Invalid details sent' });
    };

    const salesOrder: any = await SalesOrder.findById(data.id);

    data.context = {
      salesOrder: salesOrder.salesOrder,
      orderDate: salesOrder.orderDate?.toString().split('05:30:00')[0],
      amount: salesOrder.amount,
      discount: salesOrder.discount,
      grandTotal: salesOrder.grandTotal
    };
    data.template = "Sale_Order";
    data.pdf_url = salesOrder.pdf_url;

    const info = await sendMail(data);
    return res.status(200).send(data);

  } catch (e) {
    console.log(e)
    return res.status(200);
  }
}

export async function deliveryChallan(req: Request, res: Response) {
  try {
    let data: mailData = req.body;
    if (
      data.to.length < 1
      || data.subject === ''
      || data.fileName === ''
      || data.body === '' 
    ) {
      console.log('error caught')
      return res.status(200).send({ error: 'Invalid details sent' });
    };

    const deliveryChallan: any = await DeliveryChallan.findById(data.id);

    data.context = {
      deliveryChallan: deliveryChallan.deliveryChallan,
      challanDate: deliveryChallan.challanDate?.toString().split('05:30:00')[0],
      amount: deliveryChallan.amount,
      discount: deliveryChallan.discount,
      grandTotal: deliveryChallan.grandTotal
    };
    data.template = "Delivery_Challan";
    data.pdf_url = deliveryChallan.pdf_url;

    const info = await sendMail(data);
    return res.status(200).send(data);

  } catch (e) {
    console.log(e)
    return res.status(200);
  }
}

export async function saleInvoice(req: Request, res: Response) {
  try {
    let data: mailData = req.body;
    if (
      data.to.length < 1
      || data.subject === ''
      || data.fileName === ''
      || data.body === '' 
    ) {
      console.log('error caught')
      return res.status(200).send({ error: 'Invalid details sent' });
    };

    const saleInvoice: any = await SaleInvoice.findById(data.id);

    data.context = {
      invoice: saleInvoice?.invoice,
      invoiceDate: saleInvoice?.invoiceDate?.toString().split('05:30:00')[0],
      amount: saleInvoice?.amount,
      adjustments: saleInvoice?.adjustments,
      discount: saleInvoice?.discount,
      taxType: saleInvoice?.taxType?.toUpperCase(),
      taxAmount: saleInvoice.taxationAmount,
      withholdingTax: saleInvoice.withholdingTax,
      paidAmount: saleInvoice.paidAmount,
      grandTotal: saleInvoice.grandTotal
    };
    data.template = "Sale_Invoice";
    data.pdf_url = saleInvoice.pdf_url;

    const info = await sendMail(data);
    return res.status(200).send(data);

  } catch (e) {
    console.log(e)
    return res.status(200);
  }
}

export async function salePayment(req: Request, res: Response) {
  try {
    let data: mailData = req.body;
    if (
      data.to.length < 1
      || data.subject === ''
      || data.fileName === ''
      || data.body === '' 
    ) {
      console.log('error caught')
      return res.status(200).send({ error: 'Invalid details sent' });
    };

    const salePayment: any = await SalePayment.findById(data.id);

    data.context = {
      paymentNumber: salePayment.paymentNumber,
      paymentDate: salePayment.paymentDate?.toString().split('05:30:00')[0],
      paymentAmount: salePayment.paymentAmount,
      excessAmount: salePayment.excessAmount,
      amountReceived: salePayment.amountReceived,
    };
    data.template = "Sale_Payment";
    data.pdf_url = salePayment.pdf_url;

    const info = await sendMail(data);
    return res.status(200).send(data);

  } catch (e) {
    console.log(e)
    return res.status(200);
  }
}

export async function creditNote(req: Request, res: Response) {
  try {
    let data: mailData = req.body;
    if (
      data.to.length < 1
      || data.subject === ''
      || data.fileName === ''
      || data.body === '' 
    ) {
      console.log('error caught')
      return res.status(200).send({ error: 'Invalid details sent' });
    };

    const creditNote: any = await CreditNote.findById(data.id);

    data.context = {
      creditNote: creditNote.creditNote,
      creditDate: creditNote.creditDate?.toString().split('05:30:00')[0],
      amount: creditNote.amount,
      discount: creditNote.discount,
      taxAmount: creditNote.taxAmount,
      grandTotal: creditNote.grandTotal,
    };
    data.template = "Credit_Note";
    data.pdf_url = creditNote.pdf_url;

    const info = await sendMail(data);
    return res.status(200).send(data);

  } catch (e) {
    console.log(e)
    return res.status(200);
  }
}