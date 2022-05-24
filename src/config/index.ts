module.exports = {
  expenseScheduler : {
    frequency: "1 0 * * *",
    handler: "src/handlers/recurringExpenseScheduler"
  },
  billScheduler : {
    frequency: "1 0 * * *",
    handler: "src/handlers/recurringBillScheduler"
  },
} 