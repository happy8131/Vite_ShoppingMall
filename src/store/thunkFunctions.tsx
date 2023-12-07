/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/users/register`, body);

      return res.data;
    } catch (err: any) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/users/login`, body);

      return res.data;
    } catch (err: any) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/users/logout`);

      return res.data;
    } catch (err: any) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message || err.message);
    }
  }
);

export const authUser = createAsyncThunk(
  "user/authUser",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/users/auth`);

      return res.data;
    } catch (err: any) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message || err.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async (body, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/users/cart`, body);

      return res.data;
    } catch (err: any) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message || err.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "user/getCartItems",
  async ({ cartItemIds, userCart }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `/products/${cartItemIds}?type=array`
      );

      userCart.forEach((cartItem: { id: number; quantity: number }) => {
        res.data.forEach(
          (
            productDetail: {
              _id: number;
            },
            index: number
          ) => {
            if (cartItem.id === productDetail._id) {
              res.data[index].quantity = cartItem.quantity;
            }
          }
        );
      });
      return res.data;
    } catch (err: any) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message || err.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "user/removeCartItem",
  async (productId: number, thunkAPI) => {
    try {
      const res = await axiosInstance.delete(
        `/users/cart?productId=${productId}`
      );

      res.data.cart.forEach((cartItem: { id: number; quantity: number }) => {
        res.data.productInfo.forEach(
          (productItem: { _id: number }, idx: number) => {
            if (cartItem.id === productItem._id) {
              res.data.productInfo[idx].quantity = cartItem.quantity;
            }
          }
        );
      });
      return res.data;
    } catch (err: any) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message || err.message);
    }
  }
);

export const payProducts = createAsyncThunk(
  "user/payProducts",
  async (body, thunkAPI) => {
    try {
      const res = await axiosInstance.post(`/users/payment`, body);

      return res.data;
    } catch (err: any) {
      console.log(err.message);
      return thunkAPI.rejectWithValue(err.message || err.message);
    }
  }
);
