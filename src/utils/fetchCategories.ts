export const fetchCategories = async () => {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
	const data: Category[] = await res.json();
	return data;
};
