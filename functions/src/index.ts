import * as admin from 'firebase-admin';
import { onRequest } from 'firebase-functions/v2/https';
import Stripe from 'stripe';

admin.initializeApp();
const db = admin.firestore();

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecret ? new Stripe(stripeSecret, { apiVersion: '2025-01-27.acacia' }) : null;

export const createCheckoutSession = onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!stripe) {
    res.status(500).json({ error: 'Stripe is not configured' });
    return;
  }

  const { uid, email, origin } = req.body as { uid: string; email: string; origin: string };
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: process.env.PRICE_ID_MONTHLY_1199, quantity: 1 }],
    customer_email: email,
    success_url: `${origin}/account?checkout=success`,
    cancel_url: `${origin}/explore?checkout=cancelled`,
    metadata: { uid },
  });

  res.json({ url: session.url });
});

export const stripeWebhook = onRequest({ cors: true }, async (req, res) => {
  if (!stripe) {
    res.status(500).send('Stripe not configured');
    return;
  }

  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    res.status(400).send('Missing stripe signature/webhook secret');
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, signature, webhookSecret);
  } catch (error) {
    res.status(400).send(`Webhook Error: ${String(error)}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const uid = session.metadata?.uid;
    if (uid) {
      await db.collection('users').doc(uid).set(
        {
          subscriptionStatus: 'active',
          stripeCustomerId: String(session.customer ?? ''),
          stripeSubscriptionId: String(session.subscription ?? ''),
        },
        { merge: true },
      );
    }
  }

  if (event.type === 'customer.subscription.deleted' || event.type === 'customer.subscription.updated') {
    const sub = event.data.object as Stripe.Subscription;
    const users = await db.collection('users').where('stripeSubscriptionId', '==', sub.id).get();
    await Promise.all(
      users.docs.map((doc) =>
        doc.ref.set(
          {
            subscriptionStatus: sub.status === 'active' ? 'active' : sub.status === 'trialing' ? 'trialing' : 'canceled',
          },
          { merge: true },
        ),
      ),
    );
  }

  res.json({ received: true });
});
