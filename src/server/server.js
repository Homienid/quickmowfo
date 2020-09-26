import express from 'express';
import Order from './templates/Order';
import Cancelation from './templates/Cancelation';
import sendMail from './nodemailer';
const app = express();
const path = require('path');
const root = path.join(__dirname, '../frontend');
const sk_live = process.env.STRIPE_SK_LIVE;
const sk_test = process.env.STRIPE_SK_TEST;
const stripe = require('stripe')(sk_live);
const cors = require('cors');
const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();
const { v4: uuid } = require("uuid");
const { Client } = require('@googlemaps/google-maps-services-js')
const client = new Client({ });
const fs = require("fs");

app.use(cors());
app.use(express.json());
app.use(express.static(root));
app.use('/views', express.static(path.join(__dirname, '../../views/')));


app.get('/mapAc', async (req, res) => {
        let { input } = req.query;

    let mapAc = await client.placeAutocomplete({
        params: {
            input: input,
            key: process.env.GOOGLE_MAPS_API_KEY
        }
    })
    mapAc = await mapAc.data.predictions

    res.json(mapAc)
})

app.get('/inRange', async (req, res) => {
    let { address } = (req.query);
    let mapDistance = await client.distancematrix({
        params: {
            origins: ['400 red hawk loop'],
            destinations: [address],
            key: process.env.GOOGLE_MAPS_API_KEY
        }
    })
    mapDistance = await mapDistance.data.rows[0].elements[0].distance.value
    mapDistance = mapDistance / 1609
    console.log(mapDistance)
    mapDistance = mapDistance < 50 ? true :  false
    res.json({inRange: mapDistance})

})

app.post('/intent', async (req, res) => {
    console.log('intent', req.body)
    var order = {...req.body};
    const order_id = uuid();

    const paymentIntent = await stripe.paymentIntents.create({
        amount: order.service.price * 100,
        currency: 'usd',
        metadata: {integration_check: 'accept_a_payment', order_id}
    });

    const {client_secret, id: paymentIntent_id} = paymentIntent;

    await firestore.collection('orders').doc(order_id).set({...order, order_id});
    
    res.json({client_secret, order_id})
});

app.post('/confirm_payment', async (req, res) => {
    let { paymentIntent_id, order_id } = req.body;

    const paymentConfirmation  = await stripe.paymentIntents.retrieve(paymentIntent_id);
    const cardLast4 = paymentConfirmation.charges.data[0].payment_method_details.card.last4;
    const timestamp = new Date().getTime();

    await firestore.collection('orders').doc(order_id).update({cardLast4, timestamp, paymentIntent_id});

    let order = await firestore.collection('orders').doc(order_id).get();
    order = order.data()
    await sendMail(order.email, 'QuickMowFo Receipt', Order(order));

    res.json(order);
});

app.post('/cancel', async (req, res) => {
    const { order_id } = req.body;
    console.log(order_id)
    var order = await firestore.collection('orders').doc(order_id).get()
    order = order.data();
    console.log(order);
    try{
        const refund = await stripe.refunds.create({
            payment_intent: order.paymentIntent_id
        })
        if(refund.status == 'succeeded'){
            await firestore.collection('orders').doc(order_id).update({status: 'refunded'});
            await sendMail(order.email, 'QuickMowFo Cancelation', Cancelation())
            res.json({status: 200, message: "You order has been successfully cancelled. You will see your money back within 15 days."})
        } else {
            res.json({status: 500, message: "Sorry the was an error while trying to cancel your order. Please try again or contact us on our facebook page."})
        }
    } catch(err) {
        console.log(err.code)
        if(err.code == 'charge_already_refunded'){
            return res.json({status: 500, message: "This order has already been refunded."})
        }
        return res.json({status: 500, message: "Sorry the was an error while trying to refund your order. Please try again or contact us on our facebook page.."})
    }
})


app.post('/availability', async (req, res) => {
    let orders = await firestore.collection('orders').get()
    orders = orders.docs.map(q => q.data().date)
    console.log(orders)
    res.json(orders)
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/index.html'))
});

app.listen(8080, () => console.log('listening'));