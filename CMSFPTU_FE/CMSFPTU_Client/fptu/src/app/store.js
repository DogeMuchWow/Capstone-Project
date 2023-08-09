import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import pageReducer from "../features/pageSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
  },
});
export default store;
