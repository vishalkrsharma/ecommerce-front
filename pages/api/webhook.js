import { mongooseConnect } from '@/lib/mongoose';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { Order } from '@/models/Order';

export default async function handle(req, res) {
  await mongooseConnect();

  const stripe = new Stripe(process.env.STRIPE_SK);
  const endpointSecret = 'whsec_a3180c71a456f0a88d46fcb7646b5e8015aa1c0f1c19ae0f6bc02f438a4c37d4';
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }
      console.log(paymentIntentSucceeded);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// flashy-gold-devout-boom
// acct_1N5vDTSCkPp9tNod
// whsec_a3180c71a456f0a88d46fcb7646b5e8015aa1c0f1c19ae0f6bc02f438a4c37d4
