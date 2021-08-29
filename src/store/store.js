// Note: Main store file...!

import rootReducer from "./reducer/reducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

export const store = createStore(
    rootReducer,
    {},
    applyMiddleware(thunk)
);

export const persistor = persistStore(store);