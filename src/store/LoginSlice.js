import { createSlice, createAsyncThunk, thunkAPI } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { auth } from "../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
const LoginSlice = createSlice({
  name: "Login",
  initialState: { success: false },
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAuth.fulfilled, (state, action) => {
      state.success = action.payload;
    });
  },
});
export const { setSuccess } = LoginSlice.actions;
export default LoginSlice.reducer;

export const loginAuth = createAsyncThunk(
  "loginAuth",
  async (dispatch, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      await signInWithEmailAndPassword(auth, dispatch.email, dispatch.password);
      toast.success("Successfully Login");
      return true;
    } catch (error) {
      console.log(error);
      toast.error("invalid Emial or password");
    }
  }
);
