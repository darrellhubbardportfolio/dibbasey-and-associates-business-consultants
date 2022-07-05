

const stripe = require("stripe");

// Create a new customer and then create an invoice item then invoice it:
stripe.customers
  .create({
    email: 'customer@example.com',
  })
  .then((customer) => {
    // have access to the customer object
    return stripe.invoiceItems
      .create({
        customer: customer.id, // set the customer id
        amount: 2500, // 25
        currency: 'usd',
        description: 'One-time setup fee',
      })
      .then((invoiceItem) => {
        return stripe.invoices.create({
          collection_method: 'send_invoice',
          customer: invoiceItem.customer,
        });
      })
      .then((invoice) => {
        // New invoice created on a new customer
      })
      .catch((err) => {
        // Deal with an error
      });
  });