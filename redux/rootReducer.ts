import { baseApi } from "./api/baseApi";
import loadingReducer from "./slices/loadingSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  loading: loadingReducer,
};
