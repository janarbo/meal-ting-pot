require('dotenv').config()

const express = require('express');
var cors = require('cors');

const stripe = require('stripe')(`${process.env.SECRET_STRIPE_KEY}`);

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
                        name: item.name,
                    },
                    unit_amount: Math.round(item.price*100)
                },
                quantity: item.quantity
            }
        }),
        mode: 'payment',
        success_url: `${req.headers.origin}/orders`,
        cancel_url: `${req.headers.origin}/home`
    })
    res.send(JSON.stringify({
        url: session.url
    }))
});

app.listen(4242, () => console.log('Running on port 4242'));
