import { urlFor } from '../../sanity';
import Image from 'next/image';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon as ShoppingCartSolidIcon } from '@heroicons/react/24/solid';
import { addToBasket, selectBasketItemsWithId } from '../redux/basketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface IProduct {
	product: Product;
}

const Product = ({ product }: IProduct) => {
	const dispatch = useDispatch();
	const [added, setAdded] = useState(false);

	const addItemToBasket = () => {
		dispatch(addToBasket(product));
		setAdded(true);
		toast.success(`${product.title} added to basket`, {
			position: 'bottom-center',
		});
	};
	return (
		<div className="md:p-18 flex h-fit w-[320px] select-none flex-col gap-y-3 rounded-xl bg-[#35383c] p-8 md:h-[500px] md:w-[360px]">
			<div className="relative h-64 w-full md:h-72">
				<Image
					src={urlFor(product.image[0]).url()}
					fill
					style={{
						objectFit: 'contain',
					}}
					alt="product"
				/>
			</div>
			<div className="flex flex-1 items-center justify-between gap-x-3">
				<div className="space-y-2 text-xl text-white md:text-2xl">
					<p>{product.title}</p>
					<p>{product.price}$</p>
				</div>
				<div
					className="flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px]"
					onClick={addItemToBasket}>
					{added ? (
						<ShoppingCartSolidIcon className="h-8 w-8 text-white" />
					) : (
						<ShoppingCartIcon className="h-8 w-8 text-white" />
					)}
				</div>
			</div>
		</div>
	);
};

export default Product;
