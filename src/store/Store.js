import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "./HomeSlice";
import LoginSlice from "./LoginSlice";
import SignupSlice from "./SignupSlice";
const Store = configureStore({
  reducer: {
    HomeSlice,
    LoginSlice,
    SignupSlice,
  },
});
export default Store;
