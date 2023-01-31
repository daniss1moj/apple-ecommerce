export const fetchProducts = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
	const data: Product[] = await res.json();
	return data;
};
