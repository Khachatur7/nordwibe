import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "@/store/slices/user"
import navigationSlice from "@/store/slices/navigation"
import filtersSlice from "@/store/slices/filters"

const reducer = combineReducers({ userSlice, navigationSlice, filtersSlice })

export const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch