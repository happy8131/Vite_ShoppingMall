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
