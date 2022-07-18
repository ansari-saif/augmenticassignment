module.exports = {
  helloScheduler : {
    frequency: "3 0 * * *",
    handler: "src/handlers/sayHello"
  },
  expenseScheduler : {
    frequency: "15 0 * * *",
    handler: "src/handlers/recurringExpenseScheduler"
  },
  billScheduler : {
    frequency: "11 0 * * *",
    handler: "src/handlers/recurringBillScheduler"
  },
  invoiceScheduler : {
    frequency: "30 0 * * *",
    handler: "src/handlers/recurringInvoiceScheduler"
  },
}