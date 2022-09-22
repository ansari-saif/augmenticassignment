// create an express get request handle for customer/:id and all customer

import { Request, Response } from "express";
import { CreditNote, Customer, DeliveryChallan, SaleEstimate, SaleInvoice, SalesOrder } from "../../../models";
import { SalePayment } from "../../../models/salePayment";

export default async function controllerGet(req: Request, res: Response) {
  const { id } = req.params;
  if (id) {
    const customer = await Customer.findById(id)
      .populate("invoices")
      .populate({
        path: "comments",
        populate: {
          path: "employee",
          select: "firstName lastName"
        }
      });
    if (!customer) {
      return res.status(404).send({ message: "Lead not found" });
    }
    return res.status(200).send(customer);
  } else {
    const customers = await Customer.find().sort({ updatedAt: -1 });
    return res.status(200).send(customers);
  }
}

export async function getEstimates(req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (id) {
      const estimates = await SaleEstimate.find({ customer: id }).populate("customer").populate("tax");
      return res.status(200).send(estimates);
    }

  } catch (e) {
    console.log(e);
    return res.status(400)
  }
}

export async function getOrders(req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (id) {
      const orders = await SalesOrder.find({ customer: id }).populate("customer");
      return res.status(200).send(orders);
    }

  } catch (e) {
    console.log(e);
    return res.status(400)
  }
}

export async function getChallans(req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (id) {
      const challans = await DeliveryChallan.find({ customer: id }).populate("customer");
      return res.status(200).send(challans);
    }
  } catch (e) {
    console.log(e);
    return res.status(400)
  }
}

export async function getInvoices(req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (id) {
      const invoices = await SaleInvoice.find({ customer: id }).populate("customer");
      return res.status(200).send(invoices);
    }
  } catch (e) {
    console.log(e);
    return res.status(400)
  }
}

export async function getPaymentsReceived(req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (id) {
      const payments = await SalePayment.find({ customer: id }).populate("customer").populate("invoice");
      return res.status(200).send(payments);
    }
  } catch (e) {
    console.log(e);
    return res.status(400)
  }
}

export async function getNotes(req: Request, res: Response) {
  const { id } = req.params;
  try {
    if (id) {
      const notes = await CreditNote.find({ customer: id }).populate("customer").populate({
        path: "invoiceDetails",
        populate: {
          path: "id",
          select: "invoice"
        }
      });
      return res.status(200).send(notes);
    }
  } catch (e) {
    console.log(e);
    return res.status(400)
  }
}
