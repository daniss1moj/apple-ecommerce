import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import Landing from '../components/Landing';
import { Tab } from '@headlessui/react';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Apple Shop</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<main className="relative h-[200vh] bg-[#e7ecee]">
				<Landing />
			</main>
			<section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]">
				<div className="space-y-10 p-16">
					<h1
						className="text-center text-4xl font-medium tracking-wide
        text-white md:text-5xl">
						New Promos
					</h1>
					<Tab.Group>
						<Tab.List className="flex justify-center">
							<Tab>Tab 1</Tab>
							<Tab>Tab 2</Tab>
							<Tab>Tab 3</Tab>
						</Tab.List>
						<Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
							<Tab.Panel className="tabPanel">Content 1</Tab.Panel>
							<Tab.Panel className="tabPanel">Content 2</Tab.Panel>
							<Tab.Panel className="tabPanel">Content 3</Tab.Panel>
							<Tab.Panel className="tabPanel">Content 4</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</section>
		</div>
	);
}
