import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shoppingCartId: null,
}

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: initialState,
    reducers: {
        setShoppingCart: (state, { payload }) => {
            state.shoppingCartId = payload.shopping_cart_id;
        },
    },
})

export default shoppingCartSlice.reducer;
export const { setShoppingCart } = shoppingCartSlice.actions;
