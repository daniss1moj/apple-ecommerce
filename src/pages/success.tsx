import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { CheckIcon, ChevronDownIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Button from '../components/Button';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import Currency from 'react-currency-formatter';
import { GetServerSideProps } from 'next';
import { fetchLineItems } from '../utils/fetchLineItems';
import { useSession } from 'next-auth/react';

interface Props {
	products: StripeProduct[];
}

const Success = ({ products }: Props) => {
	const router = useRouter();
	const { data: session } = useSession();
	const { session_id } = router.query;
	const [mounted, setMounted] = useState(false);
	const [showOrderSummary, setShowOrderSummary] = useState(false);

	const isTableOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });
	const showOrderSummaryCondition = isTableOrMobile ? showOrderSummary : true;
	const subtotal = products.reduce((acc, product) => acc + product.price.unit_amount / 100, 0);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleShowOrderSummary = () => {
		setShowOrderSummary(!showOrderSummary);
	};

	return (
		<div>
			<Head>
				<title>Thank you!</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className="mx-auto max-w-xl">
				<Link href="/">
					<div className="relative ml-4 h-16 w-8 cursor-pointer transition lg:hidden">
						<Image
							src="https://rb.gy/vsvv2o"
							fill
							style={{
								objectFit: 'contain',
							}}
							alt="logo"
						/>
					</div>
				</Link>
			</header>
			<main className="grid grid-cols-1 lg:grid-cols-9">
				<section className="order-2 mx-auto max-w-xl pb-12 lg:col-span-5 lg:mx-0 lg:max-w-none lg:pr-16 lg:pt-16 xl:pl-16 2xl:pl-44">
					<Link href="/">
						<div className="relative ml-14 hidden h-24 w-12 cursor-pointer transition lg:inline-flex">
							<Image
								src="https://rb.gy/vsvv2o"
								fill
								style={{ objectFit: 'contain' }}
								alt="logo"
							/>
						</div>
					</Link>
					<div className="my-8 ml-4 flex gap-x-4">
						<div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black">
							<CheckIcon className="h-8 w-8" />
						</div>
						<div>
							<p className="text-sm text-gray-600">
								Order #{session_id && session_id.slice(-5)}
							</p>
							<h4 className="text-lg">
								Thank you {session ? session.user?.name?.split(' ')[0] : 'Guest'}
							</h4>
						</div>
					</div>
					<div className="divde-gray-300 mx-4 divide-y rounded-md border border-gray-300 p-4 ">
						<div className="space-y-2 pb-3">
							<p>Your order is comfirmed</p>
							<p className="text-sm text-gray-600"></p>
						</div>
						<div className="pt-3 text-sm">
							<p className="font-mediun text-gray-600">Other tracking number:</p>
							<p>32434243424242</p>
						</div>
					</div>
					<div className="my-4 mx-4 rounded-md border border-gray-300 p-4">
						<p>Other updates</p>
						<p className="text-sm text-gray-500">
							You will get shipping and delievery updates by email and text.
						</p>
					</div>
					<div className="mx-4 my-4 flex items-center justify-between">
						<p className="hidden lg:inline">Need help? Contact us</p>
						<Button
							title="Continue Shopping"
							onClick={() => router.push('/')}
							width={isTableOrMobile ? 'w-full' : undefined}
							padding="py-4"
						/>
					</div>
				</section>
				{mounted && (
					<section className="overflow-y-scroll border-y border-l border-gray-300 bg-[#fafafa] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0">
						<div
							className={`w-full ${
								showOrderSummaryCondition && 'border-b'
							} border-gray-300 text-sm lg:hidden`}>
							<div className="mx-auto flex max-w-xl items-center justify-between px-4 py-6">
								<button
									onClick={handleShowOrderSummary}
									className="flex items-center gap-x-2">
									<ShoppingCartIcon className="h-6 w-6" />
									<p>Show order summary</p>
									{showOrderSummaryCondition ? (
										<ChevronUpIcon className="h-4 w-4" />
									) : (
										<ChevronDownIcon className="h-4 w-4" />
									)}
								</button>
								<p className="text-xl font-medium text-black">
									<Currency quantity={subtotal + 20} />
								</p>
							</div>
						</div>
						{showOrderSummaryCondition && (
							<div className="mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:px-10 lg:py-16">
								<div>
									{products.map((product) => {
										return (
											<div
												key={product.id}
												className="flex items-center space-x-4 text-sm font-medium">
												<div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#f1f1f1] text-xs text-white">
													<div className="relative h-7 w-7 animate-bounce">
														<Image
															src="https://rb.gy/vsvv2o"
															alt="product"
															fill
															style={{
																objectFit: 'contain',
															}}
														/>
													</div>
													<div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs">
														{product.quantity}
													</div>
												</div>
												<p className="flex-1">{product.description}</p>
												<p>
													<Currency
														quantity={product.price.unit_amount / 100}
														currency={product.currency}
													/>
												</p>
											</div>
										);
									})}
								</div>
								<div className="space-y-1 py-4">
									<div className="flex justify-between">
										<p className="text-[gray]">Subtotal</p>
										<p className="font-medium">
											<Currency quantity={subtotal} />
										</p>
									</div>
									<div className="flex justify-between text-sm">
										<p className="text-[gray]">Discount</p>
										<p className="text-[gray]"></p>
									</div>
									<div className="flex justify-between text-sm">
										<p className="text-[gray]">Shipping</p>
										<p className="font-medium">
											<Currency quantity={20} currency="USD" />
										</p>
									</div>
								</div>
								<div className="flex justify-between pt-4">
									<p>Total</p>
									<p className="flex items-center gap-x-2 text-xs text-[gray]">
										USD
										<span className="text-xl font-medium text-black">
											<Currency quantity={subtotal + 20} />
										</span>
									</p>
								</div>
							</div>
						)}
					</section>
				)}
			</main>
		</div>
	);
};

export default Success;

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
	const sessionId = query.session_id as string;
	const products = await fetchLineItems(sessionId);
	return {
		props: {
			products,
		},
	};
};
