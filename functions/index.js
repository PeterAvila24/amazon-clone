
//const {onRequest} = require("firebase-functions/v2/https");
//const logger = require("firebase-functions/logger");
const functions = require('firebase-functions');

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51PLEcqCVMPhZhCCH02N0gm9SJpn472xJCFjkzCk6MQCgQaX6IHzMlSnLfdEO2G6zzJy4u3tcW8b5qZxAitkI5Erj000BjOL68l')

// API

// App config
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get('/', (request, response) => response.status(200).send('Hello World'))

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;

    console.log('Payment Request Recived BOOM!! for this amount  >>> ', total)
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// Listen Command 
exports.api = functions.https.onRequest(app);

//http://127.0.0.1:5001/challenge-58bbd/us-central1/api