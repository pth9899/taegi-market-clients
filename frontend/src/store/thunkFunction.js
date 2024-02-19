import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/register`,
                body
            )
            return response.data;
        } catch (error) { 
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                '/users/login',
                body
            )

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)


export const findUser = createAsyncThunk(
    'user/findUser',
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                '/users/find',
                body
            )
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)


export const authUser = createAsyncThunk(
    "user/authUser",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/users/auth`
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/logout`
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const addToCart = createAsyncThunk(
    "user/addToCart",
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/cart`,
                body
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const getCartItems = createAsyncThunk(
    "user/getCartItems",
    async ({ cartItemIds, userCart }, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/products/${cartItemIds}?type=array`);
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const removeCartItem = createAsyncThunk(
    "user/removeCartItem",
    async (productId, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(
                `/users/cart?productId=${productId}`
            );

            response.data.cart.forEach(cartItem => {
                response.data.productInfo.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data.productInfo[index].quantity = cartItem.quantity;
                    }
                })
            })
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)


export const handleItem = createAsyncThunk(
    "user/removeCartItem",
    async (productId, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(
                `/users/cart?productId=${productId}`
            );

            response.data.cart.forEach(cartItem => {
                response.data.productInfo.forEach((productDetail, index) => {
                    if (cartItem.id === productDetail._id) {
                        response.data.productInfo[index].quantity = cartItem.quantity;
                    }
                })
            })
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const payProducts = createAsyncThunk(
    "user/payment",
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/payment`,
                body
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)