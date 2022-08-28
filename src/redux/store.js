import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/todoSlice";

export default configureStore({
  reducer: { todoReducer },
});
