require('dotenv').config()

const express = require('express');
var cors = require('cors');

const stripe = require('stripe')(`${process.env.STRIPE_PRIVATE_KEY}`);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: req.body.items.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.round(item.price*100)
                },
                quantity: item.quantity
            }
        }),
        mode: 'payment',
        success_url: `${process.env.SERVER_URL}/orders`,
        cancel_url: `${process.env.SERVER_URL}/home`
    })
    res.send(JSON.stringify({
        url: session.url
    }))
});

app.post('/webhook', express.json({type: 'application/json'}), (request, response) => {
  const event = request.body;

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log("PAYMENT WAS SUCCESSFUL")
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

app.listen(4000, () => console.log("Listening on port 4000"));
