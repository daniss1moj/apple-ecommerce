import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Define a type for the slice state
interface BasketState {
	items: Product[];
}

// Define the initial state using that type
const initialState: BasketState = {
	items: [],
};

export const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		addToBasket: (state: BasketState, action: PayloadAction<Product>) => {
			state.items.push(action.payload);
		},
		removeFromBasket: (state: BasketState, action: PayloadAction<{ id: string }>) => {
			const index = state.items.findIndex((item: Product) => {
				return item._id === action.payload.id;
			});
			if (index >= 0) {
				state.items = state.items.filter((item: Product) => item._id !== action.payload.id);
			}
		},
	},
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state: RootState) => state.basket.items;
export const selectBasketItemsWithId = (state: RootState, id: string) => {
	return state.basket.items.filter((item: Product) => item._id === id);
};

export const selectBasketTotal = (state: RootState) => {
	return state.basket.items.reduce((total: number, item: Product) => total + item.price, 0);
};

export default basketSlice.reducer;
