import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { urlFor } from '../../../sanity';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const items: Product[] = req.body.items;
		// Shape in which stripe expects the data to be
		const transformedItems = items.map((item) => ({
			price_data: {
				currency: 'usd',
				product_data: {
					name: item.title,
					images: [urlFor(item.image[0]).url()],
				},
				unit_amount: item.price * 100,
			},
			quantity: 1,
		}));

		try {
			// Create Checkout Sessions from body params
			const params: Stripe.Checkout.SessionCreateParams = {
				payment_method_types: ['card'],
				mode: 'payment',
				line_items: transformedItems,
				success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/checkout`,
				metadata: {
					images: JSON.stringify(items.map((item) => item.image[0].asset.url)),
				},
			};
			const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
				params,
			);
			res.status(200).json(checkoutSession);
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Internal server Error';
			res.status(500).json({
				message: errorMessage,
			});
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
