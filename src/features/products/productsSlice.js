import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        return data.products;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        filteredProducts: [],
        search: "",
        status: "idle",
        error: null,
    },
    reducers: {
        setSearch(state, action) {
            state.search = action.payload;
            state.filteredProducts = state.allProducts.filter((item) =>
                item.title.toLowerCase().includes(action.payload.toLowerCase())
            );
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "success";
                state.allProducts = action.payload;
                state.filteredProducts = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message;
            });
    },
});

export const { setSearch } = productsSlice.actions;
export default productsSlice.reducer;
